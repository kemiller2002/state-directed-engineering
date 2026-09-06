import fs from "node:fs";
import { installDirFor } from "../install.mjs";
import { diffInstallation, isClean } from "../manifest.mjs";
import { inspectStructuralLocality, loadStructuralConfig } from "../structure.mjs";
import { result, formatFileList } from "./common.mjs";

// Exit code is the whole contract for CI use: 0 means valid, non-zero means
// invalid or not installed. This command never mutates the installation.
export function runVerify(projectRoot) {
  const installDir = installDirFor(projectRoot);
  if (!fs.existsSync(installDir)) {
    return result(1, ["No .sde/ installation found."]);
  }

  const diff = diffInstallation(installDir);
  if (!diff.ok) {
    return result(1, ["SDE verification failed.", `Installation record could not be read: ${diff.error}`]);
  }

  if (isClean(diff)) {
    let structuralConfig;
    try {
      structuralConfig = loadStructuralConfig(projectRoot);
    } catch (error) {
      return result(1, [
        `SDE v${diff.manifest.sdeVersion} installation integrity verified.`,
        `Structural verification configuration failed: ${error.message}`
      ]);
    }
    let structural;
    try {
      structural = inspectStructuralLocality(projectRoot, structuralConfig);
    } catch (error) {
      return result(1, [
        `SDE v${diff.manifest.sdeVersion} installation integrity verified.`,
        `Structural source inspection failed: ${error.message}`
      ]);
    }
    const lines = [
      `SDE v${diff.manifest.sdeVersion} verified.`,
      `${diff.manifest.files.length} managed files verified.`
    ];
    if (!structural.config.enabled) {
      lines.push(`Structural review disabled by ${structural.config.source}.`);
    } else if (structural.findings.length === 0) {
      lines.push(`Structural review: ${structural.inspectedFiles} source files inspected; no SDE-STRUCT-001 warnings.`);
    } else {
      lines.push(`Structural review warnings (${structural.findings.length}):`);
      for (const finding of structural.findings) {
        lines.push(`  ${finding.code} [${finding.band}] ${finding.path}: ${finding.lineCount} physical lines`);
      }
      lines.push("Structural warnings are review signals, not proof of semantic nonconformance; they do not change this command's success exit code.");
    }
    return result(0, lines);
  }

  const lines = ["SDE verification failed."];
  if (diff.versionFileMismatch) {
    lines.push(
      `VERSION file ("${diff.versionFileMismatch.versionFile}") disagrees with MANIFEST.json sdeVersion ("${diff.versionFileMismatch.manifestSdeVersion}").`
    );
  }
  lines.push(
    ...formatFileList("Modified", diff.modified),
    ...formatFileList("Missing", diff.missing),
    ...formatFileList("Unexpected", diff.unexpected),
    "Run `sde status` for details."
  );
  return result(1, lines);
}
