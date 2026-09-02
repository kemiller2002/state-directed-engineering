import fs from "node:fs";
import { installDirFor } from "../install.mjs";
import { diffInstallation, isClean } from "../manifest.mjs";
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
    return result(0, [`SDE v${diff.manifest.sdeVersion} verified.`, `${diff.manifest.files.length} managed files verified.`]);
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
