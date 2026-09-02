import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { copyFileInto, writeFileInto, removeTree } from "./fsTree.mjs";
import { buildManifest, MANIFEST_FILENAME, VERSION_FILENAME } from "./manifest.mjs";
import { isSafeRelativePath } from "./paths.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const DISTRIBUTION_DIR = path.resolve(HERE, "..");
export const REPO_ROOT = path.resolve(DISTRIBUTION_DIR, "..");
export const DIST_OUTPUT_DIR = path.join(DISTRIBUTION_DIR, "dist");

// This build step is the SINGLE place the SDE execution package is
// produced. It does not depend on ROS in any way — it reads plain Markdown
// files by path and does not import, execute, or require ./ros or
// tools/ros_cli.mjs. Deliberately not reused: a minimal, single-field
// front-matter reader below, rather than importing ROS's own parser.
function readFrontMatterVersion(absolutePath) {
  const text = fs.readFileSync(absolutePath, "utf8");
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (!match) throw new Error(`no front matter found in ${absolutePath}`);
  const versionLine = /^version:\s*(\S+)\s*$/m.exec(match[1]);
  if (!versionLine) throw new Error(`no 'version' field in front matter of ${absolutePath}`);
  return versionLine[1];
}

function toMajorMinor(version) {
  const match = /^(\d+)\.(\d+)\./.exec(version);
  if (!match) throw new Error(`cannot derive major.minor from version ${JSON.stringify(version)}`);
  return `${match[1]}.${match[2]}`;
}

// Appends "-dirty" when the canonical source tree has uncommitted changes
// (tracked or untracked), so sourceRevision never claims a commit SHA whose
// actual committed content differs from what was just packaged. Without
// this, a build taken from a dirty tree would record a real, resolvable
// SHA that silently does not correspond to the packaged bytes — exactly
// the kind of false provenance a controlled engineering trial cannot
// tolerate (see distribution/README.md's traceability claim).
function readSourceRevision() {
  try {
    const sha = execFileSync("git", ["-C", REPO_ROOT, "rev-parse", "HEAD"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
    const dirty = execFileSync("git", ["-C", REPO_ROOT, "status", "--porcelain"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim().length > 0;
    return dirty ? `${sha}-dirty` : sha;
  } catch {
    return null;
  }
}

// Canonical doctrine/method documents cite `related_documents` (and, in
// prose, research evidence IDs) meant for a reader of the full canonical
// repository. Copied verbatim into the execution package, those
// `related_documents` entries become dangling: they name either a
// canonical path that was renamed on the way into the package (e.g.
// `doctrine/FOUR-TIER-ARCHITECTURE.md` -> `architecture/FOUR-TIER-ARCHITECTURE.md`)
// or a canonical path deliberately excluded from distribution
// (`research/...`). This rewrites each `related_documents` entry to its
// distributed destination when the target is itself distributed, and
// drops the entry otherwise, so a fresh agent following a documented
// cross-reference inside `.sde/` never hits a file that was never
// installed. Inline prose citations (e.g. "[EV-HN-2026-0005]") are left
// alone — they read as evidence citations, not as navigable links, and
// rewriting freeform prose safely is out of this build step's scope.
function rewriteRelatedDocuments(text, sourceToDestination) {
  const frontMatterMatch = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (!frontMatterMatch) return text;
  const original = frontMatterMatch[1];
  const lines = original.split(/\r?\n/);
  const keyIndex = lines.findIndex((line) => /^related_documents:\s*$/.test(line));
  if (keyIndex === -1) return text;

  let end = keyIndex + 1;
  const kept = [];
  while (end < lines.length) {
    const itemMatch = /^\s*-\s*(\S.*)$/.exec(lines[end]);
    if (!itemMatch) break;
    const target = itemMatch[1].trim();
    const rewritten = sourceToDestination.get(target);
    if (rewritten) kept.push(`  - ${rewritten}`);
    end += 1;
  }

  const replacement = kept.length > 0 ? ["related_documents:", ...kept] : ["related_documents: []"];
  const newFrontMatter = [...lines.slice(0, keyIndex), ...replacement, ...lines.slice(end)].join("\n");

  const blockStart = frontMatterMatch.index + frontMatterMatch[0].indexOf(original);
  const blockEnd = blockStart + original.length;
  return text.slice(0, blockStart) + newFrontMatter + text.slice(blockEnd);
}

function loadDistributionMap(mapPath = path.join(DISTRIBUTION_DIR, "DISTRIBUTION-MAP.json")) {
  const map = JSON.parse(fs.readFileSync(mapPath, "utf8"));
  if (!Array.isArray(map.files) || map.files.length === 0) {
    throw new Error("DISTRIBUTION-MAP.json has no files[] entries");
  }
  for (const entry of map.files) {
    if (!isSafeRelativePath(entry.destination)) {
      throw new Error(`DISTRIBUTION-MAP.json entry has an unsafe destination: ${JSON.stringify(entry.destination)}`);
    }
    if (!entry.authored && typeof entry.source !== "string") {
      throw new Error(`DISTRIBUTION-MAP.json entry for ${entry.destination} is missing 'source' and is not marked 'authored'`);
    }
  }
  return map;
}

function readPackageJson() {
  return JSON.parse(fs.readFileSync(path.join(DISTRIBUTION_DIR, "package.json"), "utf8"));
}

// Builds the execution package into outputDir (default: distribution/dist).
// Fails loudly, before writing anything destination-visible, if a canonical
// source file named in the distribution map is missing — a silent skip
// here would mean an engineering agent installs an incomplete methodology
// without any indication.
export function build({ outputDir = DIST_OUTPUT_DIR, mapPath } = {}) {
  const map = loadDistributionMap(mapPath);
  const pkg = readPackageJson();

  const missingSources = [];
  for (const entry of map.files) {
    if (entry.authored) continue;
    const absoluteSource = path.join(REPO_ROOT, entry.source);
    if (!fs.existsSync(absoluteSource)) missingSources.push(entry.source);
  }
  if (missingSources.length > 0) {
    throw new Error(
      `cannot build SDE execution package: missing canonical source file(s):\n` +
        missingSources.map((p) => `  - ${p}`).join("\n")
    );
  }

  removeTree(outputDir);
  fs.mkdirSync(outputDir, { recursive: true });

  const sourceToDestination = new Map(map.files.filter((entry) => !entry.authored).map((entry) => [entry.source, entry.destination]));

  for (const entry of map.files) {
    const destPath = path.join(outputDir, entry.destination);
    if (entry.authored) {
      const authoredPath = path.join(DISTRIBUTION_DIR, "authored", path.basename(entry.destination));
      copyFileInto(authoredPath, destPath);
    } else {
      copyFileInto(path.join(REPO_ROOT, entry.source), destPath);
      if (destPath.endsWith(".md")) {
        const original = fs.readFileSync(destPath, "utf8");
        const rewritten = rewriteRelatedDocuments(original, sourceToDestination);
        if (rewritten !== original) fs.writeFileSync(destPath, rewritten);
      }
    }
  }

  const readmeTemplate = path.join(DISTRIBUTION_DIR, "authored", "README.template.md");
  copyFileInto(readmeTemplate, path.join(outputDir, "README.md"));

  const sdeVersion = pkg.version;
  const methodVersion = toMajorMinor(readFrontMatterVersion(path.join(REPO_ROOT, map.methodVersionSource)));
  const sourceRevision = readSourceRevision();

  writeFileInto(path.join(outputDir, VERSION_FILENAME), `${sdeVersion}\n`);

  const manifest = buildManifest({
    packageName: pkg.name,
    sdeVersion,
    methodVersion,
    sourceRevision,
    dir: outputDir
  });
  writeFileInto(path.join(outputDir, MANIFEST_FILENAME), `${JSON.stringify(manifest, null, 2)}\n`);

  return { outputDir, manifest };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const { outputDir, manifest } = build();
  console.log(`Built SDE execution package v${manifest.sdeVersion} (method v${manifest.methodVersion}) at ${outputDir}`);
  console.log(`${manifest.files.length} managed files, source revision ${manifest.sourceRevision ?? "unavailable"}.`);
}
