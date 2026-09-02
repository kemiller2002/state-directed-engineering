---
id: TH-SDE-2026-0002
title: Boundary Preservation (representation collapse and uncoordinated duplication as distinct failure classes)
status: supported
type: theory
confidence: {label: high, estimate: 0.75, rationale: "Directly demonstrated by four built-and-executed experiments across five languages; the unifying single-mechanism alternative was tested and refuted by the same investigation."}
evidence_for: [EV-HN-2026-0002]
related_documents: [doctrine/BOUNDARY-PRESERVATION.md]
created: 2026-09-02
updated: 2026-09-02
tags: [boundary, wire-contract, doctrine]
---

# TH-SDE-2026-0002 — Boundary Preservation

## Statement

Boundary Preservation is not a fifth architectural tier; it is a set of
principles governing what happens to semantic information as it crosses
between the Four Tiers or leaves the system: preserve closure, delay
weakening, establish authority for duplicated facts, and validate re-entry
of external/untyped data. Failures at a boundary fall into two distinct,
compounding-but-not-identical classes: **representation collapse** (a closed
value becomes open/weaker crossing the boundary) and **uncoordinated
duplication** (two independently maintained descriptions of the same fact
with no agreement mechanism).

## Grounding

Directly evidenced by `HELIXNOTE-SEMANTIC-BOUNDARY-INVESTIGATION.md`
[EV-HN-2026-0002], which built and executed four small experiments (BP-001
through BP-004) reproducing four real, previously-shipped defects, and
explicitly tested — and refuted — a single unifying "Semantic Boundary
Collapse" hypothesis before settling on the two-class model.

## Confidence rationale

High-medium. The two-class split withstood an explicit attempt to falsify
it (Failure B was tested against the single-hypothesis frame and did not
fit). Cross-language enforcement-strength claims (F#/Rust/Java hard;
TypeScript idiom-dependent; C# weak-by-default) were independently
demonstrated in small reproductions per language, not merely asserted.

## Known limitations

- The four reproduced failures are drawn from one application's actual
  defect history; the classification's completeness against failure shapes
  not yet observed in HelixNote is unverified.
- The Three-Contract Model's "Public Integration Contract must not require
  external consumers to adopt State Programming" principle was found
  **plausible but not directly tested** by the source investigation itself
  (its own Deliverable 7, principle 6) — carried into SDE doctrine as
  RECOMMENDED, not REQUIRED, for that reason.

## Status

`supported`.
