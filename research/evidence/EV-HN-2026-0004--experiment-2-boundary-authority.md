---
id: EV-HN-2026-0004
title: HelixNote Controlled Experiment 2 — boundary authority hardening and mechanical discovery
status: accepted
type: evidence
source_repository: kemiller2002/helix-note-application
source_branch: experiment/boundary-authority-v1
source_commit: 9733156 (97331562b718aa35483e20a37d6a04524f0fce20)
source_paths:
  - docs/state-system/experiment-2-report.md
  - docs/state-system/boundary-authority-design.md
  - docs/state-system/boundary-authority-proofs.md
  - docs/state-system/experiment-comparison.json
collection_date: 2026-09-02
method: direct repository read of the committed experiment report and design document via git show at the named commit
observation_type: direct-observation
completion_date_observed: 2026-09-01 20:40:25 UTC (commit timestamp)
created: 2026-09-02
updated: 2026-09-02
tags: [experiment-2, mdr, bca, boundary-authority, target-a-d, helixnote, migration]
related_evidence: [EV-HN-2026-0002, EV-HN-2026-0003]
---

# Evidence: HelixNote Controlled Experiment 2

## Provenance

Second controlled experiment. Branch sourced from `claude/wasm-kernel-85d6h2`
at commit `c38a1b0` (baseline application state plus measurement
infrastructure — deliberately **not** Experiment 1's own experiment branch,
to keep isolation). Hardening applied against a pre-hardening tag
(`state-programming-boundary-authority-pre-v1` on `c38a1b0`), producing a
hardened-state tag (`state-programming-boundary-authority-hardened-v1` on
`ed7ea95`). Trial mutation: `ProcedureObserved`.

## The four hardening mechanisms ("Target A-D")

Sourced from `boundary-authority-design.md`, one mechanism per Experiment 1
blind spot:

| Target | Mechanism | Closes |
|---|---|---|
| A | SQL CHECK constraint agreement (contract test) | MD-01-class blind spot (persistence admission not checked against the semantic type) |
| B | Wire discriminator authority (single source of truth for the kind string) | eliminates the second, independently-maintained copy entirely — "nothing to discover" |
| C(a) | `fanOutObservation`: string dispatch → closed-DU exhaustive dispatch | the no-op/silent-omission shape from Experiment 1's §11 |
| C(b) | `fieldValueText` / `applyFieldPatch` agreement contract test | field-vocabulary duplication |
| D | Enumerated test/list drift (`Fixtures.sampleFor` forced to a compiler error if a case is missing) | test-fixture staleness |

## Key figures (as reported, exact)

| Metric | Experiment 1 (baseline) | Experiment 2 (hardened) | Delta |
|---|---|---|---|
| Mechanical Discovery Rate (strict) | 66.7% | **100%** | +33.3 pp |
| BCA (boundary files / semantic decision) | 4.0 | 4.0 | 0 (unchanged) |
| BCA (mechanical edits / semantic decision) | 7.0 | 7.0 | 0 (unchanged) |

Target B's own effect eliminated one required site outright rather than
mechanizing its discovery (E2-12, "ELIMINATED... nothing to discover") — the
first direct evidence in this research program that a hardening mechanism
can remove a propagation site rather than only changing how it is found.

## Residual finding — silent no-op survives hardening (Phase 20)

An out-of-scope mutation deliberately re-created the same "compiles, passes
every check, but the fan-out arm does nothing" shape Experiment 1 found,
this time on `ProcedureObserved`'s arm. Target C(a)'s exhaustiveness
guarantees the arm **exists**; it says nothing about whether the arm's body
does real work. Not detected by the compiler, the architecture check,
`SchemaAgreementTests.fs` (Target A), or `FieldVocabularyAgreementTests.fs`
(Target C(b)) — all pass clean with the arm inert. Detected only by a live
boundary-path integration test added specifically to close this gap
(§11, Phase 21).

## Supported claims

- Mechanical Discovery Rate can be raised from 66.7% to 100% for a
  specifically targeted set of blind spots via five small, coherent
  hardening mechanisms.
- Hardening changes **how** required boundary work is found; it does not
  change **how much** boundary work is required (BCA identical, 4.0/7.0, both
  before and after).
- A structurally-present, semantically-inert boundary arm is representable
  and undetected by exhaustiveness checking, schema agreement checks, or
  field-vocabulary agreement checks alike; only integration testing against
  the live effect closes this specific gap.

## Contradicted / not supported

- "Boundary hardening reduces required boundary-change volume" — directly
  contradicted; BCA was unchanged.
- "Exhaustiveness checking is sufficient for behavioral correctness" —
  directly contradicted by the Phase 20 no-op finding.

## Quality and limitations

- Single trial, single new case (`ProcedureObserved`), executed by the same
  human-supervised session acting as its own instrument (as in Experiment 1;
  the independently-spawned isolated-agent protocol was introduced in
  Experiment 3).
- This experiment's own trial mutation never required API-tier corrections
  work — a scope limitation Experiment 3 later identified and deliberately
  extended into (see EV-HN-2026-0005).
- Remote tag push for `state-programming-boundary-authority-experiment-v2`
  failed with the same HTTP 403 policy restriction Experiment 1 hit; the
  tag exists locally on the recorded SHA only.
