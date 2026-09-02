import fs from "node:fs";
import { installDirFor, installFrom } from "../install.mjs";
import { diffInstallation, isClean } from "../manifest.mjs";
import { compareVersions } from "../semver.mjs";
import { result, loadPackagedManifest, formatFileList } from "./common.mjs";

export function runUpdate(projectRoot, packagedDir) {
  const packaged = loadPackagedManifest(packagedDir);
  const installDir = installDirFor(projectRoot);

  if (!fs.existsSync(installDir)) {
    return result(1, ["No .sde/ installation found. Run `sde init` first."]);
  }

  const existing = diffInstallation(installDir);
  if (!existing.ok) {
    return result(1, [
      "The existing .sde/ installation record could not be read:",
      `  ${existing.error}`,
      "Resolve this manually; update refuses to act on an installation it cannot verify."
    ]);
  }

  const comparison = compareVersions(existing.manifest.sdeVersion, packaged.sdeVersion);

  if (comparison > 0) {
    return result(1, [
      `Installed SDE v${existing.manifest.sdeVersion} is newer than this CLI's packaged v${packaged.sdeVersion}.`,
      "Refusing to downgrade."
    ]);
  }

  if (comparison === 0) {
    if (isClean(existing)) {
      return result(0, [`SDE v${packaged.sdeVersion} already installed and verified. Nothing to update.`]);
    }
    return result(1, [
      `SDE v${packaged.sdeVersion} is installed but has local modifications; there is no newer version to update to,`,
      "and update never overwrites modified files even when versions match.",
      ...formatFileList("Modified", existing.modified),
      ...formatFileList("Missing", existing.missing)
    ]);
  }

  // comparison < 0: an upgrade is available.
  if (!isClean(existing)) {
    return result(1, [
      `Update refused: SDE v${existing.manifest.sdeVersion} has local modifications.`,
      ...formatFileList("Modified", existing.modified),
      ...formatFileList("Missing", existing.missing),
      "Resolve the modifications above, then re-run update. Local modifications are never overwritten automatically."
    ]);
  }

  const installed = installFrom(packagedDir, projectRoot);
  return result(0, [
    `SDE updated: v${existing.manifest.sdeVersion} -> v${installed.manifest.sdeVersion}.`,
    `${installed.manifest.files.length} managed files verified.`
  ]);
}
