import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { runInit } from "../src/commands/init.mjs";
import { runUpdate } from "../src/commands/update.mjs";
import { installFrom, installDirFor } from "../src/install.mjs";
import { readManifest } from "../src/manifest.mjs";
import { makeTempDir, cleanup, packagedDir, fixturePackageWithVersion } from "./helpers.mjs";

test("update upgrades an older, unmodified installation deterministically", () => {
  const project = makeTempDir();
  const olderFixture = fixturePackageWithVersion("0.0.1");
  try {
    installFrom(olderFixture, project);
    const before = readManifest(installDirFor(project));
    assert.equal(before.manifest.sdeVersion, "0.0.1");

    const update = runUpdate(project, packagedDir());
    assert.equal(update.exitCode, 0);
    assert.match(update.lines[0], /0\.0\.1 -> v0\.1\.0/);

    const after = readManifest(installDirFor(project));
    assert.equal(after.manifest.sdeVersion, "0.1.0");
  } finally {
    cleanup(project, olderFixture);
  }
});

test("update refuses to overwrite a locally modified installation", () => {
  const project = makeTempDir();
  const olderFixture = fixturePackageWithVersion("0.0.1");
  try {
    installFrom(olderFixture, project);
    const modifiedFile = path.join(installDirFor(project), "method", "CONSTRUCTION-METHOD.md");
    fs.appendFileSync(modifiedFile, "\nlocal edit\n");
    const before = fs.readFileSync(modifiedFile, "utf8");

    const update = runUpdate(project, packagedDir());
    assert.equal(update.exitCode, 1);
    assert.ok(update.lines.some((l) => l.includes("method/CONSTRUCTION-METHOD.md")));

    const stillInstalledVersion = readManifest(installDirFor(project)).manifest.sdeVersion;
    assert.equal(stillInstalledVersion, "0.0.1", "a refused update must not change the installed version");
    assert.equal(fs.readFileSync(modifiedFile, "utf8"), before, "a refused update must not touch the modified file");
  } finally {
    cleanup(project, olderFixture);
  }
});

test("update refuses to downgrade when the installed version is newer than the packaged one", () => {
  const project = makeTempDir();
  const newerFixture = fixturePackageWithVersion("9.9.9");
  try {
    installFrom(newerFixture, project);

    const update = runUpdate(project, packagedDir());
    assert.equal(update.exitCode, 1);
    assert.ok(update.lines.some((l) => l.includes("Refusing to downgrade")));

    const stillInstalledVersion = readManifest(installDirFor(project)).manifest.sdeVersion;
    assert.equal(stillInstalledVersion, "9.9.9");
  } finally {
    cleanup(project, newerFixture);
  }
});

test("update on an already-current, unmodified installation is a no-op", () => {
  const project = makeTempDir();
  try {
    runInit(project, packagedDir());
    const update = runUpdate(project, packagedDir());
    assert.equal(update.exitCode, 0);
    assert.match(update.lines[0], /already installed and verified/);
  } finally {
    cleanup(project);
  }
});
