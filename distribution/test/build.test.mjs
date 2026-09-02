import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { build } from "../src/build.mjs";
import { makeTempDir, cleanup } from "./helpers.mjs";

test("building twice from the same source produces identical managed file hashes", () => {
  const outA = makeTempDir("sde-build-a-");
  const outB = makeTempDir("sde-build-b-");
  try {
    const a = build({ outputDir: outA });
    const b = build({ outputDir: outB });
    assert.deepEqual(
      a.manifest.files,
      b.manifest.files,
      "two builds from the same commit must produce byte-identical managed files"
    );
    assert.equal(a.manifest.sdeVersion, b.manifest.sdeVersion);
    assert.equal(a.manifest.methodVersion, b.manifest.methodVersion);
  } finally {
    cleanup(outA, outB);
  }
});

test("build fails loudly, without writing a manifest, when the distribution map names a missing source", async () => {
  const { fileURLToPath } = await import("node:url");
  const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const realMap = JSON.parse(fs.readFileSync(path.join(distDir, "DISTRIBUTION-MAP.json"), "utf8"));
  realMap.files.push({ source: "method/DOES-NOT-EXIST.md", destination: "method/DOES-NOT-EXIST.md" });

  // Written to an isolated temp map file rather than mutating the real
  // DISTRIBUTION-MAP.json, since `node --test` may run test files
  // concurrently and a shared, temporarily-broken source file would make
  // other tests flaky.
  const outDir = makeTempDir("sde-build-fail-");
  const badMapPath = path.join(outDir, "bad-map.json");
  fs.writeFileSync(badMapPath, JSON.stringify(realMap, null, 2));
  try {
    assert.throws(() => build({ outputDir: path.join(outDir, "pkg"), mapPath: badMapPath }), /missing canonical source file/);
    assert.equal(fs.existsSync(path.join(outDir, "pkg", "MANIFEST.json")), false);
  } finally {
    cleanup(outDir);
  }
});
