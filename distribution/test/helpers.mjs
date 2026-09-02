import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { DIST_OUTPUT_DIR } from "../src/build.mjs";
import { buildManifest, MANIFEST_FILENAME, VERSION_FILENAME } from "../src/manifest.mjs";
import { listManagedFiles, copyFileInto, writeFileInto } from "../src/fsTree.mjs";
import { safeJoin } from "../src/paths.mjs";

export function packagedDir() {
  if (!fs.existsSync(path.join(DIST_OUTPUT_DIR, MANIFEST_FILENAME))) {
    throw new Error(`distribution/dist is not built; run 'npm run build' before the test suite (pretest should do this automatically)`);
  }
  return DIST_OUTPUT_DIR;
}

export function makeTempDir(prefix = "sde-test-") {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

export function cleanup(...dirs) {
  for (const dir of dirs) fs.rmSync(dir, { recursive: true, force: true });
}

// Builds an independent fixture package tree (a copy of the real, current
// dist/) with an overridden sdeVersion, so update/downgrade scenarios can
// be tested without needing a second real published release. Returns the
// fixture directory, which is a fully valid, self-consistent package
// (manifest hashes match its own files) at the requested version.
export function fixturePackageWithVersion(version) {
  const source = packagedDir();
  const fixtureDir = makeTempDir("sde-fixture-");
  for (const relPath of listManagedFiles(source)) {
    copyFileInto(safeJoin(source, relPath), safeJoin(fixtureDir, relPath));
  }
  writeFileInto(safeJoin(fixtureDir, VERSION_FILENAME), `${version}\n`);
  const manifest = buildManifest({
    packageName: "@echelon-foundry/sde",
    sdeVersion: version,
    methodVersion: "0.1",
    sourceRevision: "fixture",
    dir: fixtureDir
  });
  writeFileInto(safeJoin(fixtureDir, MANIFEST_FILENAME), `${JSON.stringify(manifest, null, 2)}\n`);
  return fixtureDir;
}
