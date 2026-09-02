import path from "node:path";

// A managed path is a manifest-relative POSIX-style path that must resolve
// strictly inside a given root directory. Used both for manifest entries
// (defense against a corrupted or hand-edited manifest) and for install
// destinations (defense against writing outside .sde/).
export function isSafeRelativePath(relPath) {
  if (typeof relPath !== "string" || relPath.length === 0) return false;
  if (path.isAbsolute(relPath)) return false;
  if (relPath.includes("\0")) return false;
  const normalized = path.normalize(relPath);
  if (normalized.startsWith("..") || normalized.includes(`..${path.sep}`)) return false;
  if (normalized.startsWith(path.sep)) return false;
  return true;
}

// Resolves relPath under root and asserts the result is still strictly
// inside root. Throws rather than silently truncating, so a bad manifest
// entry fails loudly instead of writing somewhere unexpected.
export function safeJoin(root, relPath) {
  if (!isSafeRelativePath(relPath)) {
    throw new Error(`unsafe managed path: ${JSON.stringify(relPath)}`);
  }
  const resolvedRoot = path.resolve(root);
  const resolved = path.resolve(resolvedRoot, relPath);
  const rootWithSep = resolvedRoot.endsWith(path.sep) ? resolvedRoot : resolvedRoot + path.sep;
  if (resolved !== resolvedRoot && !resolved.startsWith(rootWithSep)) {
    throw new Error(`path escapes root: ${JSON.stringify(relPath)}`);
  }
  return resolved;
}

// Converts a filesystem path to the forward-slash form used throughout the
// manifest, independent of the host OS path separator.
export function toManifestPath(relPath) {
  return relPath.split(path.sep).join("/");
}
