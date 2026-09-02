import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { runInit } from "../src/commands/init.mjs";
import { installDirFor } from "../src/install.mjs";
import { readManifest } from "../src/manifest.mjs";
import { makeTempDir, cleanup, packagedDir } from "./helpers.mjs";

test("clean init installs the expected files and a valid manifest", () => {
  const project = makeTempDir();
  try {
    const { exitCode, lines } = runInit(project, packagedDir());
    assert.equal(exitCode, 0);
    assert.match(lines[0], /installed successfully/);

    const installDir = installDirFor(project);
    assert.ok(fs.existsSync(path.join(installDir, "VERSION")));
    assert.ok(fs.existsSync(path.join(installDir, "README.md")));
    assert.ok(fs.existsSync(path.join(installDir, "method", "CONSTRUCTION-METHOD.md")));
    assert.ok(fs.existsSync(path.join(installDir, "architecture", "FOUR-TIER-ARCHITECTURE.md")));
    assert.ok(fs.existsSync(path.join(installDir, "reference", "GLOSSARY.md")));
    assert.ok(fs.existsSync(path.join(installDir, "templates", "work-item.md")));

    const read = readManifest(installDir);
    assert.ok(read.ok, read.error);
    assert.equal(read.manifest.schemaVersion, 1);
    assert.ok(read.manifest.files.length > 0);
  } finally {
    cleanup(project);
  }
});

test("running init twice is a no-op the second time and does not rewrite files", () => {
  const project = makeTempDir();
  try {
    runInit(project, packagedDir());
    const installDir = installDirFor(project);
    const constructionMethodPath = path.join(installDir, "method", "CONSTRUCTION-METHOD.md");
    const before = fs.statSync(constructionMethodPath);

    const second = runInit(project, packagedDir());
    assert.equal(second.exitCode, 0);
    assert.match(second.lines[0], /already installed and verified/);

    const after = fs.statSync(constructionMethodPath);
    assert.equal(before.mtimeMs, after.mtimeMs, "second init must not rewrite an already-correct file");
  } finally {
    cleanup(project);
  }
});

test("init refuses cleanly when the target directory does not exist", () => {
  const parent = makeTempDir();
  try {
    const missing = path.join(parent, "does-not-exist");
    const { exitCode, lines } = runInit(missing, packagedDir());
    assert.equal(exitCode, 1);
    assert.match(lines[0], /not a directory/);
  } finally {
    cleanup(parent);
  }
});

test("init does not touch unrelated files already in the project", () => {
  const project = makeTempDir();
  try {
    fs.writeFileSync(path.join(project, "unrelated.txt"), "keep me");
    runInit(project, packagedDir());
    assert.equal(fs.readFileSync(path.join(project, "unrelated.txt"), "utf8"), "keep me");
  } finally {
    cleanup(project);
  }
});
