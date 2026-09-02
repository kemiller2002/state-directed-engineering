import crypto from "node:crypto";
import fs from "node:fs";

// SHA-256 over the exact bytes on disk. Git's .gitattributes normalizes
// this repository's text files to LF on checkout, so no newline
// normalization is performed here — the checked-out bytes are treated as
// canonical. Applying our own EOL rewriting would create the exact
// OS-dependent nondeterminism this is meant to avoid.
export function sha256File(filePath) {
  const bytes = fs.readFileSync(filePath);
  return sha256Bytes(bytes);
}

export function sha256Bytes(bytes) {
  return crypto.createHash("sha256").update(bytes).digest("hex");
}
