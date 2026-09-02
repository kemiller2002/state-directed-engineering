import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { runInit } from "../src/commands/init.mjs";
import { runVerify } from "../src/commands/verify.mjs";
import { runStatus } from "../src/commands/status.mjs";
import { installDirFor } from "../src/install.mjs";
import { makeTempDir, cleanup, packagedDir } from "./helpers.mjs";

// Simulates a manifest and VERSION file that were each internally
// self-consistent (VERSION's own hash matches what MANIFEST.json records
// for it) but disagree with each other about which version is installed —
// a corruption class the plain per-file hash check alone would not catch,
// since VERSION's hash still matches.
test("a VERSION file that disagrees with MANIFEST.json sdeVersion is detected", () => {
  const project = makeTempDir();
  try {
    runInit(project, packagedDir());
    const installDir = installDirFor(project);
    const versionPath = path.join(installDir, "VERSION");
    const manifestPath = path.join(installDir, "MANIFEST.json");

    const tamperedVersionContent = "9.9.9\n";
    fs.writeFileSync(versionPath, tamperedVersionContent);
    const newHash = crypto.createHash("sha256").update(tamperedVersionContent).digest("hex");

    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    const versionEntry = manifest.files.find((f) => f.path === "VERSION");
    versionEntry.sha256 = newHash;
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

    const verify = runVerify(project);
    assert.equal(verify.exitCode, 1);
    assert.ok(verify.lines.some((l) => l.includes("VERSION file") && l.includes("disagrees")));
    assert.ok(!verify.lines.includes("Modified:"), "VERSION's own hash still matches, so it must not also be reported as a modified file");

    const status = runStatus(project, packagedDir());
    assert.equal(status.exitCode, 1);
    assert.ok(status.lines.some((l) => l.includes("disagrees")));
  } finally {
    cleanup(project);
  }
});
