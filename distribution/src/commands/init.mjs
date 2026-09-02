import fs from "node:fs";
import { installDirFor, installFrom } from "../install.mjs";
import { diffInstallation, isClean } from "../manifest.mjs";
import { compareVersions } from "../semver.mjs";
import { result, loadPackagedManifest, formatFileList } from "./common.mjs";

export function runInit(projectRoot, packagedDir) {
  if (!fs.existsSync(projectRoot) || !fs.statSync(projectRoot).isDirectory()) {
    return result(1, [`${projectRoot} is not a directory.`]);
  }
  try {
    fs.accessSync(projectRoot, fs.constants.W_OK);
  } catch {
    return result(1, [`${projectRoot} is not writable.`]);
  }

  const packaged = loadPackagedManifest(packagedDir);
  const installDir = installDirFor(projectRoot);

  if (!fs.existsSync(installDir)) {
    const installed = installFrom(packagedDir, projectRoot);
    return result(0, [
      `SDE v${packaged.sdeVersion} installed successfully.`,
      `${installed.manifest.files.length} managed files verified.`
    ]);
  }

  const existing = diffInstallation(installDir);
  if (!existing.ok) {
    return result(1, [
      "An .sde/ directory already exists but its installation record could not be read:",
      `  ${existing.error}`,
      "Resolve this manually before running init again (init never overwrites an installation it cannot verify)."
    ]);
  }

  const comparison = compareVersions(existing.manifest.sdeVersion, packaged.sdeVersion);

  if (comparison === 0) {
    if (isClean(existing)) {
      return result(0, [`SDE v${packaged.sdeVersion} already installed and verified.`]);
    }
    return result(1, [
      `SDE v${packaged.sdeVersion} is installed but has local modifications; init will not overwrite it.`,
      ...formatFileList("Modified", existing.modified),
      ...formatFileList("Missing", existing.missing),
      "Run `sde status` for details."
    ]);
  }

  if (comparison < 0) {
    if (!isClean(existing)) {
      return result(1, [
        `SDE v${existing.manifest.sdeVersion} is installed with local modifications; init will not overwrite it.`,
        ...formatFileList("Modified", existing.modified),
        ...formatFileList("Missing", existing.missing),
        `A newer version (v${packaged.sdeVersion}) is available once the modifications above are resolved.`
      ]);
    }
    return result(0, [
      `SDE v${existing.manifest.sdeVersion} is installed and verified.`,
      `A newer version (v${packaged.sdeVersion}) is available. Run \`sde update\` to upgrade deliberately.`
    ]);
  }

  return result(1, [
    `Installed SDE v${existing.manifest.sdeVersion} is newer than this CLI's packaged v${packaged.sdeVersion}.`,
    "Refusing to downgrade. Use a newer @echelon-foundry/sde release, or leave the installation as-is."
  ]);
}
