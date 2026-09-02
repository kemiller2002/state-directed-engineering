import { readManifest } from "../manifest.mjs";

// A command result is deliberately plain data (exit code + lines of text),
// never a direct console.log/process.exit call, so tests can assert on it
// without spawning a subprocess or capturing stdout.
export function result(exitCode, lines) {
  return { exitCode, lines: Array.isArray(lines) ? lines : [lines] };
}

export function loadPackagedManifest(packagedDir) {
  const read = readManifest(packagedDir);
  if (!read.ok) {
    throw new Error(
      `the bundled SDE execution package at ${packagedDir} is invalid (${read.error}). ` +
        "This indicates a broken @echelon-foundry/sde release, not a problem with the target project."
    );
  }
  return read.manifest;
}

export function formatFileList(label, paths) {
  if (paths.length === 0) return [];
  return [`${label}:`, ...paths.map((p) => `  ${p}`)];
}
