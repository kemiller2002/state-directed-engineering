import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { build, REPO_ROOT } from "../src/build.mjs";
import { makeTempDir, cleanup } from "./helpers.mjs";

test("building twice from the same source produces identical managed file hashes", () => {
  const outA = makeTempDir("sde-build-a-");
  const outB = makeTempDir("sde-build-b-");
  try {
    const a = build({ outputDir: outA });
    const b = build({ outputDir: outB });
    assert.deepEqual(
      a.manifest.files,
      b.manifest.files,
      "two builds from the same commit must produce byte-identical managed files"
    );
    assert.equal(a.manifest.sdeVersion, b.manifest.sdeVersion);
    assert.equal(a.manifest.methodVersion, b.manifest.methodVersion);
  } finally {
    cleanup(outA, outB);
  }
});

test("build fails loudly, without writing a manifest, when the distribution map names a missing source", () => {
  const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const realMap = JSON.parse(fs.readFileSync(path.join(distDir, "DISTRIBUTION-MAP.json"), "utf8"));
  realMap.files.push({ source: "method/DOES-NOT-EXIST.md", destination: "method/DOES-NOT-EXIST.md" });

  // Written to an isolated temp map file rather than mutating the real
  // DISTRIBUTION-MAP.json, since `node --test` may run test files
  // concurrently and a shared, temporarily-broken source file would make
  // other tests flaky.
  const outDir = makeTempDir("sde-build-fail-");
  const badMapPath = path.join(outDir, "bad-map.json");
  fs.writeFileSync(badMapPath, JSON.stringify(realMap, null, 2));
  try {
    assert.throws(() => build({ outputDir: path.join(outDir, "pkg"), mapPath: badMapPath }), /missing canonical source file/);
    assert.equal(fs.existsSync(path.join(outDir, "pkg", "MANIFEST.json")), false);
  } finally {
    cleanup(outDir);
  }
});

test("sourceRevision is suffixed '-dirty' when the canonical source tree has uncommitted changes", () => {
  // Touches a real tracked file in the canonical repo (there is no injectable
  // REPO_ROOT to build an isolated fixture against) and always restores it,
  // even on assertion failure. Safe under `node --test`'s file-level
  // parallelism because no other test file rebuilds the package; the only
  // other build() caller in this suite runs earlier in this same file,
  // where node:test executes tests sequentially by default.
  const probeFile = path.join(REPO_ROOT, "method", "CONSTRUCTION-METHOD-v0.1.md");
  const original = fs.readFileSync(probeFile, "utf8");
  const outDir = makeTempDir("sde-build-dirty-");
  try {
    fs.appendFileSync(probeFile, "\n<!-- audit test dirty marker, restored immediately -->\n");
    const { manifest } = build({ outputDir: outDir });
    assert.match(manifest.sourceRevision, /-dirty$/);
  } finally {
    fs.writeFileSync(probeFile, original);
    cleanup(outDir);
  }
});

test("sourceRevision has no '-dirty' suffix when the canonical source tree is clean", () => {
  const status = execFileSync("git", ["-C", REPO_ROOT, "status", "--porcelain"], { encoding: "utf8" });
  if (status.trim().length > 0) {
    // The tree is genuinely dirty for reasons outside this test's control
    // (e.g. a developer's own in-progress edit) — asserting a clean build
    // here would be testing the environment, not the code under test.
    return;
  }
  const outDir = makeTempDir("sde-build-clean-");
  try {
    const { manifest } = build({ outputDir: outDir });
    assert.doesNotMatch(manifest.sourceRevision, /-dirty$/);
  } finally {
    cleanup(outDir);
  }
});

test("every related_documents entry in the built package resolves to a file that is actually installed", () => {
  const outDir = makeTempDir("sde-build-refs-");
  try {
    build({ outputDir: outDir });
    const installed = new Set();
    const walk = (dir, prefix) => {
      for (const name of fs.readdirSync(dir)) {
        const full = path.join(dir, name);
        const rel = prefix ? `${prefix}/${name}` : name;
        if (fs.statSync(full).isDirectory()) walk(full, rel);
        else installed.add(rel);
      }
    };
    walk(outDir, "");

    const danglingByFile = {};
    for (const relPath of installed) {
      if (!relPath.endsWith(".md")) continue;
      const text = fs.readFileSync(path.join(outDir, relPath), "utf8");
      const frontMatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
      if (!frontMatter) continue;
      const block = /related_documents:\s*\n((?:\s*-\s*.+\n?)*)/.exec(frontMatter[1]);
      if (!block) continue;
      const refs = [...block[1].matchAll(/-\s*(\S.*)/g)].map((m) => m[1].trim());
      const dangling = refs.filter((ref) => !installed.has(ref));
      if (dangling.length > 0) danglingByFile[relPath] = dangling;
    }
    assert.deepEqual(danglingByFile, {}, "no distributed file should reference a related_documents path that isn't itself installed");
  } finally {
    cleanup(outDir);
  }
});
