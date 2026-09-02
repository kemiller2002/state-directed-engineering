import fs from "node:fs";
import path from "node:path";
import { toManifestPath } from "./paths.mjs";

// Recursively lists regular files under dir, returning manifest-style
// (forward-slash) paths relative to dir. Symlinks are not followed and are
// reported as an error rather than silently included or silently skipped,
// since a symlink under a managed installation could otherwise be used to
// escape the install root.
export function listManagedFiles(dir) {
  const results = [];
  const walk = (current, relPrefix) => {
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      const entryPath = path.join(current, entry.name);
      const relPath = relPrefix ? path.join(relPrefix, entry.name) : entry.name;
      if (entry.isSymbolicLink()) {
        throw new Error(`refusing to manage a symlink: ${toManifestPath(relPath)}`);
      }
      if (entry.isDirectory()) {
        walk(entryPath, relPath);
      } else if (entry.isFile()) {
        results.push(toManifestPath(relPath));
      }
    }
  };
  if (fs.existsSync(dir)) walk(dir, "");
  return results.sort();
}

// Copies a single file's bytes verbatim, creating parent directories as
// needed. No newline or encoding transformation is performed.
export function copyFileInto(srcPath, destPath) {
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.copyFileSync(srcPath, destPath);
}

export function writeFileInto(destPath, contents) {
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, contents);
}

export function removeTree(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}
