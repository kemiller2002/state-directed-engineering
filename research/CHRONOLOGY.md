---
id: SDE-CHRONOLOGY-001
title: State Programming / State-Directed Engineering Chronology
status: accepted
version: 0.1.0
created: 2026-09-02
updated: 2026-09-02
tags: [chronology, history]
---

# Chronology

Dates are git commit timestamps from `kemiller2002/helix-note-application`
and `kemiller2002/state-directed-engineering`, verified directly
(`git show -s --format=%ci <sha>`), not estimated. Where a date is uncertain
or an artifact could not be located, that is stated explicitly rather than
guessed.

| Date (UTC) | Event | Source |
|---|---|---|
| 2026-08-30 | HelixNote State-System Pilot final report — the Four-Tier layering (semantic core isolated via `netstandard2.0`, hosts, orchestration) is established and validated across four hosts (in-process, Postgres, Giraffe HTTP, WASM/browser) | `HELIXNOTE-STATE-SYSTEM-PILOT-REPORT.md`, HelixNote `main`, dated in-document |
| 2026-09-01 14:30:14 | Semantic Boundary Investigation — four real boundary failures reproduced and root-caused; Representation Collapse / Uncoordinated Duplication classes established; Three Contract Model proposed | HelixNote commit `a7639d8` (not on `main`; reachable only from experiment branches) |
| 2026-09-01 17:00:57 | `state-programming-boundary-baseline-v1` baseline tag cut | HelixNote commit `182e0e2` |
| 2026-09-01 17:58:10 | Baseline commit checklist marked complete with actual SHA | HelixNote commit `c38a1b0` |
| 2026-09-01 18:24:42 | **Controlled Experiment 1** — `VitalSignObserved`, MDR 66.7% (8/12), BCA 4.0, silent-omission defect reproduced live | HelixNote commit `a8d5a4f`, branch `experiment/observed-value-boundary-amplification` |
| 2026-09-01 (between 18:24 and 20:40) | Boundary-authority hardening designed and applied (Target A-D) | `boundary-authority-design.md`, branch `experiment/boundary-authority-v1` |
| 2026-09-01 20:40:25 | **Controlled Experiment 2** — `ProcedureObserved`, MDR 100% (up from 66.7%), BCA unchanged at 4.0, residual present-but-inert-arm defect found (Phase 20); Experiment 1 vs. 2 comparison recorded | HelixNote commit `9733156`, branch `experiment/boundary-authority-v1` |
| 2026-09-01 (session, exact time not recorded in either repository) | **Controlled Experiment 3** (original draft) — `ImagingFindingObserved`, paired isolated-agent A/B trial; report initially misstated Condition A's log entry count as 167 | HelixNote commit `39bfa64`, branch `experiment/agent-cost-comparison-v3` — **superseded**, see next row |
| 2026-09-02 00:25:50 | **Controlled Experiment 3 (CORRECTED, authoritative)** — log-count corrected to 76 (true ratio ~2.1x, not ~4.6x); harness-level telemetry surfaced with Condition B incompleteness caveat; third independent BCA=4.0 replication computed; positive self-report-reliability finding recorded | HelixNote commit `8ac05fd`, branch `experiment/agent-cost-comparison-v3` |
| between 2026-09-01 20:40 and 2026-09-02 00:26 (exact time unknown) | A transition artifact referenced by the migration mission, `STATE-PROGRAMMING-EXPERIMENT-3-TO-ENGINEERING-TRANSITION_2026-09-01_2019_EDT.txt` (filename implies ~2026-09-02 00:19 UTC), was apparently produced by an orchestrating session moving from the Experiment 3 research toward SDE. **Not found** in either repository's git history on any branch, or on local disk, as of this migration. Presumed uncommitted/ephemeral. See `DF-SDE-2026-0002`. | Not located — recorded as a migration gap |
| 2026-09-02 (this migration) | State-Directed Engineering repository bootstrap: State Programming research inventoried and consolidated into SDE evidence/hypothesis/theory/decision records; SDE doctrine (State Programming, State-Directed Engineering, Four-Tier Architecture, Boundary Preservation, Glossary, Evidence-to-Engineering Map, Contradictions register) established; Construction Method v0.1 and supporting method documents scaffolded; ROS work items created for this and follow-on work | `state-directed-engineering` repository, branch `claude/bootstrap-sde-from-helix-0umjmt` |

## Open dating gaps

- The exact commit/time "State-Directed Engineering" was first named as
  distinct from "State Programming" is not recorded in either repository's
  git history; it is first formalized as a named decision in this
  migration (`DF-SDE-2026-0001`), dated 2026-09-02.
- Experiment 3's original draft commit (`39bfa64`) timestamp was not
  separately extracted; only its supersession by `8ac05fd` (00:25:50 UTC)
  is recorded with certainty.
