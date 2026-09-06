import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { runInit } from "../src/commands/init.mjs";
import { runVerify } from "../src/commands/verify.mjs";
import { countPhysicalLines } from "../src/structure.mjs";
import { makeTempDir, cleanup, packagedDir } from "./helpers.mjs";

function writeLines(filePath, count) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, Array.from({ length: count }, (_, index) => `line ${index + 1}`).join("\n") + "\n");
}

test("physical-line counting handles empty, terminated, and unterminated text", () => {
  assert.equal(countPhysicalLines(""), 0);
  assert.equal(countPhysicalLines("one"), 1);
  assert.equal(countPhysicalLines("one\n"), 1);
  assert.equal(countPhysicalLines("one\r\ntwo\r\n"), 2);
});

test("SDE-STRUCT-001 reports every default review band without failing verify", () => {
  const project = makeTempDir();
  try {
    runInit(project, packagedDir());
    writeLines(path.join(project, "src", "review.ts"), 500);
    writeLines(path.join(project, "src", "strong.ts"), 1000);
    writeLines(path.join(project, "src", "justification.ts"), 2001);
    writeLines(path.join(project, "src", "conformance.ts"), 4001);

    const result = runVerify(project);
    assert.equal(result.exitCode, 0, "structural review findings must warn, not fail integrity verification");
    assert.ok(result.lines.some((line) => line.includes("[review] src/review.ts: 500")));
    assert.ok(result.lines.some((line) => line.includes("[strong-review] src/strong.ts: 1000")));
    assert.ok(result.lines.some((line) => line.includes("[justification-required] src/justification.ts: 2001")));
    assert.ok(result.lines.some((line) => line.includes("[conformance-concern] src/conformance.ts: 4001")));
    assert.ok(result.lines.some((line) => line.includes("review signals")));
  } finally {
    cleanup(project);
  }
});

test("default source extensions include Node module and shell source units", () => {
  const project = makeTempDir();
  try {
    runInit(project, packagedDir());
    writeLines(path.join(project, "src", "module.mjs"), 500);
    writeLines(path.join(project, "scripts", "check.sh"), 500);

    const result = runVerify(project);
    assert.equal(result.exitCode, 0);
    assert.ok(result.lines.some((line) => line.includes("src/module.mjs: 500")));
    assert.ok(result.lines.some((line) => line.includes("scripts/check.sh: 500")));
  } finally {
    cleanup(project);
  }
});

test("project config can override thresholds, extensions, and excluded paths", () => {
  const project = makeTempDir();
  try {
    runInit(project, packagedDir());
    fs.writeFileSync(path.join(project, "sde.config.json"), JSON.stringify({
      structuralReview: {
        extensions: [".custom"],
        excludePaths: ["generated"],
        thresholds: {
          reviewAt: 3,
          strongReviewAt: 5,
          justificationAbove: 7,
          conformanceConcernAbove: 9
        }
      }
    }));
    writeLines(path.join(project, "src", "included.custom"), 5);
    writeLines(path.join(project, "generated", "ignored.custom"), 20);
    writeLines(path.join(project, "src", "ignored.ts"), 20);

    const result = runVerify(project);
    assert.equal(result.exitCode, 0);
    assert.ok(result.lines.some((line) => line.includes("[strong-review] src/included.custom: 5")));
    assert.ok(!result.lines.some((line) => line.includes("generated/ignored.custom")));
    assert.ok(!result.lines.some((line) => line.includes("src/ignored.ts")));
  } finally {
    cleanup(project);
  }
});

test("invalid structural configuration fails clearly because the requested check cannot be trusted", () => {
  const project = makeTempDir();
  try {
    runInit(project, packagedDir());
    fs.writeFileSync(path.join(project, "sde.config.json"), JSON.stringify({
      structuralReview: {
        thresholds: {
          reviewAt: 1000,
          strongReviewAt: 500,
          justificationAbove: 2000,
          conformanceConcernAbove: 4000
        }
      }
    }));

    const result = runVerify(project);
    assert.equal(result.exitCode, 1);
    assert.ok(result.lines.some((line) => line.includes("Structural verification configuration failed")));
    assert.ok(result.lines.some((line) => line.includes("reviewAt < strongReviewAt")));
  } finally {
    cleanup(project);
  }
});

test("unknown structural configuration fields fail instead of silently weakening review", () => {
  const project = makeTempDir();
  try {
    runInit(project, packagedDir());
    fs.writeFileSync(path.join(project, "sde.config.json"), JSON.stringify({
      structuralReview: { threshold: { reviewAt: 5 } }
    }));

    const result = runVerify(project);
    assert.equal(result.exitCode, 1);
    assert.ok(result.lines.some((line) => line.includes("unknown field(s): threshold")));
  } finally {
    cleanup(project);
  }
});
