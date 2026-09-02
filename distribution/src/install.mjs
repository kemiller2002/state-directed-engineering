import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { copyFileInto, listManagedFiles, removeTree } from "./fsTree.mjs";
import { diffInstallation, isClean, readManifest } from "./manifest.mjs";
import { safeJoin } from "./paths.mjs";

export const INSTALL_DIR_NAME = ".sde";

export function installDirFor(projectRoot) {
  return path.join(projectRoot, INSTALL_DIR_NAME);
}

// Copies every file from a already-built, already-verified package
// directory (sourceDir) into a fresh sibling temp directory, verifies the
// copy against sourceDir's own manifest, then atomically swaps it into
// place at installDirFor(projectRoot). If any step fails, the previous
// installation (if any) is left untouched.
//
// "Atomic" here means: nothing under the final .sde/ path is ever visible
// in a partially-written state. We build into a sibling temp directory
// first (same parent, so the final rename is a same-filesystem rename,
// not a cross-device copy) and only rename once the copy has been
// independently re-verified.
export function installFrom(sourceDir, projectRoot) {
  const read = readManifest(sourceDir);
  if (!read.ok) {
    throw new Error(`refusing to install: source package failed manifest check: ${read.error}`);
  }

  const targetDir = installDirFor(projectRoot);
  const tempDir = path.join(projectRoot, `.sde.new-${crypto.randomBytes(6).toString("hex")}`);
  const backupDir = path.join(projectRoot, `.sde.old-${crypto.randomBytes(6).toString("hex")}`);

  removeTree(tempDir);
  try {
    for (const relPath of listManagedFiles(sourceDir)) {
      copyFileInto(safeJoin(sourceDir, relPath), safeJoin(tempDir, relPath));
    }

    const verification = diffInstallation(tempDir);
    if (!isClean(verification)) {
      throw new Error(
        `install verification failed after copy (this indicates a filesystem or copy problem, not a source-package problem): ${JSON.stringify(verification)}`
      );
    }

    let hadPrevious = false;
    if (fs.existsSync(targetDir)) {
      hadPrevious = true;
      fs.renameSync(targetDir, backupDir);
    }
    try {
      fs.renameSync(tempDir, targetDir);
    } catch (error) {
      if (hadPrevious) fs.renameSync(backupDir, targetDir);
      throw error;
    }
    if (hadPrevious) removeTree(backupDir);
  } finally {
    removeTree(tempDir);
  }

  return diffInstallation(targetDir);
}
