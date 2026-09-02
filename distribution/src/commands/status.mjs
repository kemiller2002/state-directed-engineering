import fs from "node:fs";
import { installDirFor } from "../install.mjs";
import { diffInstallation, isClean } from "../manifest.mjs";
import { compareVersions } from "../semver.mjs";
import { result, loadPackagedManifest, formatFileList } from "./common.mjs";

export function runStatus(projectRoot, packagedDir) {
  const packaged = loadPackagedManifest(packagedDir);
  const installDir = installDirFor(projectRoot);

  if (!fs.existsSync(installDir)) {
    return result(1, [
      "SDE project status",
      "Installed:      (none)",
      `Available:      ${packaged.sdeVersion}`,
      "Run `sde init` to install."
    ]);
  }

  const diff = diffInstallation(installDir);
  if (!diff.ok) {
    return result(1, ["SDE project status", `Integrity:      unreadable (${diff.error})`]);
  }

  const clean = isClean(diff);
  const lines = [
    "SDE project status",
    `Installed:      ${diff.manifest.sdeVersion}`,
    `Available:      ${packaged.sdeVersion}`,
    `Source revision: ${diff.manifest.sourceRevision ?? "unknown"}`,
    `Integrity:      ${clean ? "verified" : "modified"}`,
    `Modified files: ${diff.modified.length}`,
    `Missing files:  ${diff.missing.length}`
  ];
  if (diff.unexpected.length > 0) lines.push(`Unexpected files: ${diff.unexpected.length}`);
  if (diff.versionFileMismatch) {
    lines.push(
      `VERSION file ("${diff.versionFileMismatch.versionFile}") disagrees with MANIFEST.json sdeVersion ("${diff.versionFileMismatch.manifestSdeVersion}").`
    );
  }
  lines.push(...formatFileList("Modified", diff.modified));
  lines.push(...formatFileList("Missing", diff.missing));
  lines.push(...formatFileList("Unexpected", diff.unexpected));

  const comparison = compareVersions(diff.manifest.sdeVersion, packaged.sdeVersion);
  if (comparison < 0) {
    lines.push(`An update is available: run \`sde update\` to upgrade to v${packaged.sdeVersion}.`);
  } else if (comparison > 0) {
    lines.push(`Installed version v${diff.manifest.sdeVersion} is newer than this CLI's packaged v${packaged.sdeVersion}.`);
  }

  return result(clean ? 0 : 1, lines);
}
