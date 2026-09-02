#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runInit } from "../src/commands/init.mjs";
import { runStatus } from "../src/commands/status.mjs";
import { runVerify } from "../src/commands/verify.mjs";
import { runUpdate } from "../src/commands/update.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PACKAGED_DIR = path.resolve(HERE, "..", "dist");

const COMMANDS = { init: runInitCommand, status: runStatusCommand, verify: runVerifyCommand, update: runUpdateCommand };

function requirePackagedDir() {
  if (!fs.existsSync(path.join(PACKAGED_DIR, "MANIFEST.json"))) {
    console.error(
      "This @echelon-foundry/sde installation has no built execution package (dist/MANIFEST.json is missing). " +
        "If you are developing this package from source, run `npm run build` first."
    );
    process.exit(1);
  }
  return PACKAGED_DIR;
}

function runInitCommand() {
  return runInit(process.cwd(), requirePackagedDir());
}
function runStatusCommand() {
  return runStatus(process.cwd(), requirePackagedDir());
}
function runVerifyCommand() {
  return runVerify(process.cwd());
}
function runUpdateCommand() {
  return runUpdate(process.cwd(), requirePackagedDir());
}

function main(argv) {
  const [command] = argv;
  const handler = COMMANDS[command];
  if (!handler) {
    console.error("Usage: sde <init|status|verify|update>");
    return 2;
  }
  // Any command that touches an existing .sde/ installation can encounter
  // filesystem states this tool deliberately refuses to handle (a managed
  // path replaced by a symlink, a permission error, and similar) — those
  // are reported as a clean command failure, never a raw stack trace, so
  // exit-code-only automation and a human both get an actionable message.
  let outcome;
  try {
    outcome = handler();
  } catch (error) {
    outcome = { exitCode: 1, lines: [`sde ${command} failed: ${error.message}`] };
  }
  const { exitCode, lines } = outcome;
  const stream = exitCode === 0 ? console.log : console.error;
  for (const line of lines) stream(line);
  return exitCode;
}

process.exitCode = main(process.argv.slice(2));
