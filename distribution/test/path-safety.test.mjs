import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { safeJoin, isSafeRelativePath } from "../src/paths.mjs";
import { runInit } from "../src/commands/init.mjs";
import { runVerify } from "../src/commands/verify.mjs";
import { installDirFor } from "../src/install.mjs";
import { makeTempDir, cleanup, packagedDir } from "./helpers.mjs";

test("isSafeRelativePath rejects traversal and absolute paths", () => {
  assert.equal(isSafeRelativePath("method/CONSTRUCTION-METHOD.md"), true);
  assert.equal(isSafeRelativePath("../escape.txt"), false);
  assert.equal(isSafeRelativePath("method/../../escape.txt"), false);
  assert.equal(isSafeRelativePath("/etc/passwd"), false);
  assert.equal(isSafeRelativePath(""), false);
});

test("safeJoin throws instead of resolving outside root", () => {
  const root = makeTempDir();
  try {
    assert.throws(() => safeJoin(root, "../outside.txt"));
    assert.throws(() => safeJoin(root, "/etc/passwd"));
    assert.equal(safeJoin(root, "a/b.txt"), path.resolve(root, "a", "b.txt"));
  } finally {
    cleanup(root);
  }
});

test("a manifest with a path-traversal entry is treated as unreadable, not followed", () => {
  const project = makeTempDir();
  try {
    runInit(project, packagedDir());
    const manifestPath = path.join(installDirFor(project), "MANIFEST.json");
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    manifest.files.push({ path: "../../escape.txt", sha256: "0".repeat(64) });
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

    const verify = runVerify(project);
    assert.equal(verify.exitCode, 1);
    assert.ok(verify.lines.some((l) => l.includes("unsafe")));

    const outsidePath = path.join(project, "..", "escape.txt");
    assert.equal(fs.existsSync(outsidePath), false);
  } finally {
    cleanup(project);
  }
});
