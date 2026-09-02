---
id: EV-HN-2026-0003
title: HelixNote Controlled Experiment 1 — new semantic case / boundary amplification (baseline architecture)
status: accepted
type: evidence
source_repository: kemiller2002/helix-note-application
source_branch: experiment/observed-value-boundary-amplification
source_commit: a8d5a4fb81b8eebef84386e3a4bed80b0554835b
source_tag: state-programming-observed-value-experiment-v1 (local only; remote tag push rejected HTTP 403)
baseline_tag: state-programming-boundary-baseline-v1
baseline_sha: 182e0e22b07123a08c9c47ee4b96ca571a7ff4c7
source_paths:
  - docs/state-system/HELIXNOTE-EXPERIMENT-1-OBSERVED-VALUE-BOUNDARY-AMPLIFICATION.md
collection_date: 2026-09-02
method: direct repository read of the committed experiment report via git show at the named commit
observation_type: direct-observation (report is itself a first-person experimental record produced by the executing session, re-verified against committed diffs within the same report)
completion_date_observed: 2026-09-01 18:24:42 UTC (commit timestamp)
created: 2026-09-02
updated: 2026-09-02
tags: [experiment-1, mdr, bca, boundary, helixnote, migration]
related_evidence: [EV-HN-2026-0002]
---

# Evidence: HelixNote Controlled Experiment 1

## Provenance

First controlled experiment in this research program. Mutation:
`VitalSignObserved`, a new `ObservedValue` case, added to the baseline (no
boundary-authority hardening) architecture. Branch cut directly from tag
`state-programming-boundary-baseline-v1` (SHA `182e0e2`).

## Key figures (as reported, exact — not estimated)

| Metric | Value |
|---|---|
| Required handling sites | 12 |
| Mechanically discovered (compiler `FS0025`) | 8 of 12 (**66.7%** MDR — later recalculated/retained by Experiment 2's own report as this exact figure) |
| Manually discovered | 4 of 12 (33%) — via SQL CHECK-constraint archaeology (MD-01), symmetry inference with an already-fixed sibling function (MD-03, MD-07), and test-coverage review (MD-10) |
| Boundary decisions | 5 |
| Mechanical edits | 8 (7 required + 1 additional) |
| Boundary Change Amplification | **4.0** boundary files / semantic decision; 7.0 mechanical boundary edits / semantic decision |
| Repair loops | 0 (every fix compiled/passed on first attempt) |
| Silent-omission test | Positive — removing `fanOutObservation`'s `"vital_sign"` arm produced zero compiler error, zero test failure, zero runtime exception; the candidate was durably "accepted" while the clinical fact was never written anywhere retrievable |
| Detected by | none of: compiler, existing test suite, runtime. Found only by the experiment's own deliberate probe (build, test, direct query, restore) |

## Direct observations

- The one fact the compiler protects (`ObservedValue` DU shape) has **zero**
  duplication. The two facts outside the compiler's reach (the kind string,
  the correction field-name vocabulary) are duplicated 4 and 2 times
  respectively, with zero automated agreement checks.
- The semantic core remained architecture-check-clean throughout
  (`check-semantic-architecture.sh` PASSED, both before and after).
- Two of five boundary decisions are silently duplicated 2-4 times each with
  no mechanical agreement check (kind-string vocabulary independently present
  in F# twice and SQL once).
- Tool-call/token counts: **NOT OBSERVABLE** — the executing session had no
  structured telemetry access; the work-metrics table (§13) is a manual
  reconstruction from that turn's own actions, explicitly labeled "Fresh
  Reproduction," not a tool-call counter.

## Supported claims

- A significant majority (67%) of required boundary-propagation sites for a
  new closed-alternative case were mechanically discoverable via compiler
  exhaustiveness checking alone, on an architecture with no dedicated
  boundary-hardening mechanisms.
- Silent, undetected omission of a required boundary site is real and
  reproducible on the baseline architecture, not hypothetical.
- Boundary Change Amplification for this class of change, on this
  architecture, for this one case, is 4.0.

## Contradicted / not supported

- No claim of generalization beyond this one case is made in the source
  document itself (§17, "Unknowns" — the report explicitly disclaims that a
  single data point does not establish a distribution).

## Quality and limitations

- Single trial, single new case (`VitalSignObserved`), one architecture,
  one executing session acting as its own instrument (not a separately
  spawned, isolated agent — that isolation discipline was introduced later,
  in Experiment 3).
- Tag `state-programming-observed-value-experiment-v1` could not be pushed to
  the remote (HTTP 403, repository/token policy on tag refs) — it exists
  locally on the SHA recorded above only; not independently reproducible
  from a fresh clone's tag list, only from the branch commit SHA.
