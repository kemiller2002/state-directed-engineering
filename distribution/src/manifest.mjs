import fs from "node:fs";
import path from "node:path";
import { sha256File } from "./hash.mjs";
import { listManagedFiles } from "./fsTree.mjs";
import { safeJoin, isSafeRelativePath } from "./paths.mjs";

export const MANIFEST_SCHEMA_VERSION = 1;
export const MANIFEST_FILENAME = "MANIFEST.json";
export const VERSION_FILENAME = "VERSION";

// MANIFEST.json itself is never listed inside its own files[] — hashing a
// file to include a hash of itself is not meaningful. VERSION and
// README.md are ordinary managed content and are listed like any other
// file, so their modification is detected the same way.
const MANIFEST_SELF_EXCLUDE = new Set([MANIFEST_FILENAME]);

export function buildManifest({ packageName, sdeVersion, methodVersion, sourceRevision, dir }) {
  const files = listManagedFiles(dir)
    .filter((relPath) => !MANIFEST_SELF_EXCLUDE.has(relPath))
    .map((relPath) => ({
      path: relPath,
      sha256: sha256File(safeJoin(dir, relPath))
    }));
  return {
    schemaVersion: MANIFEST_SCHEMA_VERSION,
    sdeVersion,
    methodVersion,
    sourceRevision: sourceRevision ?? null,
    packageName,
    files
  };
}

export function readManifest(installDir) {
  const manifestPath = path.join(installDir, MANIFEST_FILENAME);
  if (!fs.existsSync(manifestPath)) {
    return { ok: false, error: `missing ${MANIFEST_FILENAME}` };
  }
  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  } catch (error) {
    return { ok: false, error: `malformed ${MANIFEST_FILENAME}: ${error.message}` };
  }
  const problems = validateManifestShape(parsed);
  if (problems.length > 0) {
    return { ok: false, error: `invalid ${MANIFEST_FILENAME}: ${problems.join("; ")}` };
  }
  return { ok: true, manifest: parsed };
}

export function validateManifestShape(manifest) {
  const problems = [];
  if (typeof manifest !== "object" || manifest === null) {
    return ["manifest is not an object"];
  }
  if (manifest.schemaVersion !== MANIFEST_SCHEMA_VERSION) {
    problems.push(`unsupported schemaVersion ${JSON.stringify(manifest.schemaVersion)}`);
  }
  if (typeof manifest.sdeVersion !== "string" || manifest.sdeVersion.length === 0) {
    problems.push("sdeVersion must be a non-empty string");
  }
  if (typeof manifest.packageName !== "string" || manifest.packageName.length === 0) {
    problems.push("packageName must be a non-empty string");
  }
  if (!Array.isArray(manifest.files)) {
    problems.push("files must be an array");
    return problems;
  }
  const seen = new Set();
  for (const entry of manifest.files) {
    if (typeof entry !== "object" || entry === null) {
      problems.push("a files[] entry is not an object");
      continue;
    }
    if (!isSafeRelativePath(entry.path)) {
      problems.push(`files[] entry has an unsafe or missing path: ${JSON.stringify(entry.path)}`);
      continue;
    }
    if (typeof entry.sha256 !== "string" || !/^[0-9a-f]{64}$/.test(entry.sha256)) {
      problems.push(`files[] entry ${entry.path} has an invalid sha256`);
    }
    if (seen.has(entry.path)) {
      problems.push(`files[] entry ${entry.path} is duplicated`);
    }
    seen.add(entry.path);
  }
  return problems;
}

// Compares an on-disk installation against its own manifest. Returns the
// modified, missing, and unexpected-file sets — never repairs anything.
export function diffInstallation(installDir) {
  const read = readManifest(installDir);
  if (!read.ok) {
    return { ok: false, error: read.error };
  }
  const manifest = read.manifest;
  const modified = [];
  const missing = [];
  for (const entry of manifest.files) {
    const absolutePath = safeJoin(installDir, entry.path);
    if (!fs.existsSync(absolutePath)) {
      missing.push(entry.path);
      continue;
    }
    const actual = sha256File(absolutePath);
    if (actual !== entry.sha256) {
      modified.push(entry.path);
    }
  }
  const declared = new Set(manifest.files.map((entry) => entry.path));
  const onDisk = listManagedFiles(installDir).filter(
    (relPath) => relPath !== MANIFEST_FILENAME
  );
  const unexpected = onDisk.filter((relPath) => !declared.has(relPath));

  // Belt-and-braces consistency check, independent of the per-file hash
  // check above: VERSION's own text content must literally agree with
  // MANIFEST.json's sdeVersion. These are written together by build.mjs
  // and should never disagree; if they do (e.g. a hand-edit that kept
  // VERSION's hash consistent with a hand-edited manifest), that is a
  // distinct, explicit integrity failure rather than silently trusting
  // whichever file was read last.
  let versionFileMismatch = null;
  const versionPath = safeJoin(installDir, VERSION_FILENAME);
  if (fs.existsSync(versionPath) && !missing.includes(VERSION_FILENAME)) {
    const versionFileContent = fs.readFileSync(versionPath, "utf8").trim();
    if (versionFileContent !== manifest.sdeVersion) {
      versionFileMismatch = { versionFile: versionFileContent, manifestSdeVersion: manifest.sdeVersion };
    }
  }

  return {
    ok: true,
    manifest,
    modified: modified.sort(),
    missing: missing.sort(),
    unexpected: unexpected.sort(),
    versionFileMismatch
  };
}

export function isClean(diff) {
  return (
    diff.ok &&
    diff.modified.length === 0 &&
    diff.missing.length === 0 &&
    diff.unexpected.length === 0 &&
    !diff.versionFileMismatch
  );
}
