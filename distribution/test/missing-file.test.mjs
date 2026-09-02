import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { runInit } from "../src/commands/init.mjs";
import { runVerify } from "../src/commands/verify.mjs";
import { installDirFor } from "../src/install.mjs";
import { makeTempDir, cleanup, packagedDir } from "./helpers.mjs";

test("verify fails and reports a missing managed file", () => {
  const project = makeTempDir();
  try {
    runInit(project, packagedDir());
    fs.rmSync(path.join(installDirFor(project), "reference", "GLOSSARY.md"));

    const verify = runVerify(project);
    assert.equal(verify.exitCode, 1);
    assert.ok(verify.lines.some((l) => l.includes("reference/GLOSSARY.md")));
    assert.ok(verify.lines.some((l) => l === "Missing:"));
  } finally {
    cleanup(project);
  }
});
