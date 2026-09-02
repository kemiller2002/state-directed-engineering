import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { makeTempDir, cleanup } from "./helpers.mjs";

const BIN = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "bin", "sde.mjs");

function runCli(args, cwd) {
  try {
    const stdout = execFileSync(process.execPath, [BIN, ...args], { cwd, encoding: "utf8" });
    return { exitCode: 0, stdout };
  } catch (error) {
    return { exitCode: error.status, stdout: error.stdout, stderr: error.stderr };
  }
}

test("the real CLI binary can init, verify, and report status end to end", () => {
  const project = makeTempDir();
  try {
    const init = runCli(["init"], project);
    assert.equal(init.exitCode, 0);
    assert.match(init.stdout, /installed successfully/);

    const verify = runCli(["verify"], project);
    assert.equal(verify.exitCode, 0);

    const status = runCli(["status"], project);
    assert.equal(status.exitCode, 0);
    assert.match(status.stdout, /SDE project status/);
  } finally {
    cleanup(project);
  }
});

test("an unknown command exits non-zero with a usage message", () => {
  const project = makeTempDir();
  try {
    const result = runCli(["bogus"], project);
    assert.equal(result.exitCode, 2);
    assert.match(result.stderr, /Usage: sde/);
  } finally {
    cleanup(project);
  }
});
