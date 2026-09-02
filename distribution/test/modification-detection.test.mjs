import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { runInit } from "../src/commands/init.mjs";
import { runStatus } from "../src/commands/status.mjs";
import { runVerify } from "../src/commands/verify.mjs";
import { installDirFor } from "../src/install.mjs";
import { makeTempDir, cleanup, packagedDir } from "./helpers.mjs";

test("status and verify detect a modified managed file", () => {
  const project = makeTempDir();
  try {
    runInit(project, packagedDir());
    const target = path.join(installDirFor(project), "method", "CONSTRUCTION-METHOD.md");
    fs.appendFileSync(target, "\ntampered\n");

    const verify = runVerify(project);
    assert.equal(verify.exitCode, 1);
    assert.ok(verify.lines.some((l) => l.includes("method/CONSTRUCTION-METHOD.md")));

    const status = runStatus(project, packagedDir());
    assert.equal(status.exitCode, 1);
    assert.ok(status.lines.some((l) => l === "Integrity:      modified"));
    assert.ok(status.lines.some((l) => l === "Modified files: 1"));
  } finally {
    cleanup(project);
  }
});

test("verify detects an unexpected file under .sde/ not declared by the manifest", () => {
  const project = makeTempDir();
  try {
    runInit(project, packagedDir());
    fs.writeFileSync(path.join(installDirFor(project), "method", "SNUCK-IN.md"), "surprise");

    const verify = runVerify(project);
    assert.equal(verify.exitCode, 1);
    assert.ok(verify.lines.some((l) => l.includes("method/SNUCK-IN.md")));
  } finally {
    cleanup(project);
  }
});
