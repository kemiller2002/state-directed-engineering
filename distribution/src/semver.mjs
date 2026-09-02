// Minimal semantic-version comparison for plain "major.minor.patch"
// strings. Deliberately not a full semver implementation (no
// prerelease/build metadata handling) — SDE releases do not currently need
// that, and pulling in a semver dependency for three-integer comparison
// would violate the minimal-dependency rule.
function parse(version) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(version).trim());
  if (!match) return null;
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

// Returns -1, 0, or 1. Throws if either version cannot be parsed, since a
// silent fallback here could mask a real installation problem.
export function compareVersions(a, b) {
  const pa = parse(a);
  const pb = parse(b);
  if (!pa) throw new Error(`not a valid semantic version: ${JSON.stringify(a)}`);
  if (!pb) throw new Error(`not a valid semantic version: ${JSON.stringify(b)}`);
  for (let i = 0; i < 3; i += 1) {
    if (pa[i] !== pb[i]) return pa[i] < pb[i] ? -1 : 1;
  }
  return 0;
}
