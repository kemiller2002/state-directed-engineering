import fs from "node:fs";
import path from "node:path";
import { isSafeRelativePath, toManifestPath } from "./paths.mjs";

export const STRUCTURAL_CONFIG_FILENAME = "sde.config.json";

export const DEFAULT_STRUCTURAL_CONFIG = Object.freeze({
  enabled: true,
  extensions: Object.freeze([
    ".c", ".cc", ".clj", ".cljs", ".cpp", ".cs", ".cxx", ".dart",
    ".erl", ".cjs", ".cts", ".ex", ".exs", ".fs", ".fsx", ".go",
    ".groovy", ".hrl", ".hs", ".java", ".js", ".jsx", ".kt", ".kts",
    ".lhs", ".lua", ".m", ".mjs", ".ml", ".mli", ".mm", ".mts",
    ".php", ".pl", ".py", ".r", ".rb", ".rs", ".scala", ".sh",
    ".sql", ".svelte", ".swift", ".ts", ".tsx", ".vue"
  ]),
  excludedDirectoryNames: Object.freeze([
    ".git", ".hg", ".next", ".ros", ".sde", ".svn", "build",
    "coverage", "dist", "node_modules", "obj", "target", "vendor"
  ]),
  excludePaths: Object.freeze([]),
  thresholds: Object.freeze({
    reviewAt: 500,
    strongReviewAt: 1000,
    justificationAbove: 2000,
    conformanceConcernAbove: 4000
  })
});

function requireObject(value, label) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`${label} must be an object`);
  }
  return value;
}

function validateStringArray(value, label, predicate) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string" || !predicate(item))) {
    throw new Error(`${label} must be an array of valid strings`);
  }
  return [...new Set(value)].sort();
}

function validateThresholds(value) {
  const supplied = requireObject(value, "structuralReview.thresholds");
  const allowed = new Set(Object.keys(DEFAULT_STRUCTURAL_CONFIG.thresholds));
  const unknown = Object.keys(supplied).filter((name) => !allowed.has(name));
  if (unknown.length > 0) {
    throw new Error(`structuralReview.thresholds has unknown field(s): ${unknown.sort().join(", ")}`);
  }
  const thresholds = { ...DEFAULT_STRUCTURAL_CONFIG.thresholds, ...supplied };
  for (const [name, number] of Object.entries(thresholds)) {
    if (!Number.isInteger(number) || number < 1) {
      throw new Error(`structuralReview.thresholds.${name} must be a positive integer`);
    }
  }
  if (!(thresholds.reviewAt < thresholds.strongReviewAt &&
        thresholds.strongReviewAt <= thresholds.justificationAbove &&
        thresholds.justificationAbove < thresholds.conformanceConcernAbove)) {
    throw new Error(
      "structuralReview thresholds must satisfy reviewAt < strongReviewAt <= justificationAbove < conformanceConcernAbove"
    );
  }
  return thresholds;
}

export function loadStructuralConfig(projectRoot) {
  const configPath = path.join(projectRoot, STRUCTURAL_CONFIG_FILENAME);
  if (!fs.existsSync(configPath)) {
    return {
      ...DEFAULT_STRUCTURAL_CONFIG,
      extensions: [...DEFAULT_STRUCTURAL_CONFIG.extensions],
      excludedDirectoryNames: [...DEFAULT_STRUCTURAL_CONFIG.excludedDirectoryNames],
      excludePaths: [],
      thresholds: { ...DEFAULT_STRUCTURAL_CONFIG.thresholds },
      source: "defaults"
    };
  }

  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(configPath, "utf8"));
  } catch (error) {
    throw new Error(`${STRUCTURAL_CONFIG_FILENAME} is not valid JSON: ${error.message}`);
  }
  requireObject(parsed, STRUCTURAL_CONFIG_FILENAME);
  const review = parsed.structuralReview === undefined
    ? {}
    : requireObject(parsed.structuralReview, "structuralReview");
  const allowedReviewFields = new Set(["enabled", "extensions", "excludePaths", "thresholds"]);
  const unknownReviewFields = Object.keys(review).filter((name) => !allowedReviewFields.has(name));
  if (unknownReviewFields.length > 0) {
    throw new Error(`structuralReview has unknown field(s): ${unknownReviewFields.sort().join(", ")}`);
  }

  if (review.enabled !== undefined && typeof review.enabled !== "boolean") {
    throw new Error("structuralReview.enabled must be boolean");
  }
  const extensions = review.extensions === undefined
    ? [...DEFAULT_STRUCTURAL_CONFIG.extensions]
    : validateStringArray(
        review.extensions,
        "structuralReview.extensions",
        (item) => /^\.[A-Za-z0-9]+$/.test(item)
      ).map((item) => item.toLowerCase());
  const excludePaths = review.excludePaths === undefined
    ? []
    : validateStringArray(
        review.excludePaths,
        "structuralReview.excludePaths",
        (item) => isSafeRelativePath(item) && item !== "."
      ).map((item) => toManifestPath(path.normalize(item)).replace(/\/$/, ""));
  const thresholds = review.thresholds === undefined
    ? { ...DEFAULT_STRUCTURAL_CONFIG.thresholds }
    : validateThresholds(review.thresholds);

  return {
    enabled: review.enabled ?? true,
    extensions,
    excludedDirectoryNames: [...DEFAULT_STRUCTURAL_CONFIG.excludedDirectoryNames],
    excludePaths,
    thresholds,
    source: STRUCTURAL_CONFIG_FILENAME
  };
}

function isExcludedPath(relPath, excludePaths) {
  const manifestPath = toManifestPath(relPath);
  return excludePaths.some((excluded) => manifestPath === excluded || manifestPath.startsWith(`${excluded}/`));
}

function listSourceFiles(projectRoot, config) {
  const results = [];
  const extensions = new Set(config.extensions.map((item) => item.toLowerCase()));
  const excludedNames = new Set(config.excludedDirectoryNames);

  const walk = (absoluteDir, relativeDir) => {
    const entries = fs.readdirSync(absoluteDir, { withFileTypes: true });
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      const relativePath = relativeDir ? path.join(relativeDir, entry.name) : entry.name;
      if (isExcludedPath(relativePath, config.excludePaths)) continue;
      if (entry.isSymbolicLink()) continue;
      if (entry.isDirectory()) {
        if (!excludedNames.has(entry.name)) walk(path.join(absoluteDir, entry.name), relativePath);
        continue;
      }
      if (!entry.isFile()) continue;
      if (extensions.has(path.extname(entry.name).toLowerCase())) {
        results.push(toManifestPath(relativePath));
      }
    }
  };

  walk(projectRoot, "");
  return results.sort();
}

export function countPhysicalLines(text) {
  if (text.length === 0) return 0;
  const lineBreaks = text.match(/\r\n|\r|\n/g)?.length ?? 0;
  return lineBreaks + (/\r\n$|\r$|\n$/.test(text) ? 0 : 1);
}

function bandFor(lineCount, thresholds) {
  if (lineCount > thresholds.conformanceConcernAbove) return "conformance-concern";
  if (lineCount > thresholds.justificationAbove) return "justification-required";
  if (lineCount >= thresholds.strongReviewAt) return "strong-review";
  if (lineCount >= thresholds.reviewAt) return "review";
  return null;
}

export function inspectStructuralLocality(projectRoot, config = loadStructuralConfig(projectRoot)) {
  if (!config.enabled) return { config, findings: [], inspectedFiles: 0 };

  const files = listSourceFiles(projectRoot, config);
  const findings = [];
  for (const relativePath of files) {
    const text = fs.readFileSync(path.join(projectRoot, relativePath), "utf8");
    const lineCount = countPhysicalLines(text);
    const band = bandFor(lineCount, config.thresholds);
    if (band) {
      findings.push({ code: "SDE-STRUCT-001", band, path: relativePath, lineCount });
    }
  }
  findings.sort((a, b) => b.lineCount - a.lineCount || a.path.localeCompare(b.path));
  return { config, findings, inspectedFiles: files.length };
}
