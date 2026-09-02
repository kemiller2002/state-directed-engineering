---
id: SDE-MIGRATION-MANIFEST-001
title: State Programming → SDE Migration Manifest
status: accepted
version: 0.1.0
created: 2026-09-02
updated: 2026-09-02
tags: [migration, manifest, provenance]
---

# State Programming → SDE Migration Manifest

Authoritative record of every artifact imported, summarized, or referenced
during the State Programming → State-Directed Engineering migration
conducted on 2026-09-02. Nothing important disappears silently: an item not
migrated is listed in the Gaps section below with a reason.

## Migration table

| Migration ID | Source repo | Source branch | Source commit | Source path | Title | Type | Classification | Status | Destination path | Method | Related IDs | Reason for inclusion | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| MIG-001 | helix-note-application | main | 211462a | docs/state-system/HELIXNOTE-FOUR-TIER-CONFORMANCE-AUDIT.md | Four-Tier State-System Model — Conformance Audit | doc | AUTHORITATIVE (for HelixNote's own state-category model) | accepted | doctrine/FOUR-TIER-ARCHITECTURE.md; research/evidence/EV-HN-2026-0001 | summarized + disambiguated | EV-HN-2026-0001, TH-SDE-2026-0001 | Nearest HelixNote source for "four tiers"; requires explicit disambiguation from SDE's own architectural tiering | Names a state-category taxonomy, not the architectural layering SDE's doctrine describes — see disambiguation in EV-HN-2026-0001 |
| MIG-002 | helix-note-application | main | 211462a | docs/state-system/HELIXNOTE-STATE-SYSTEM-PILOT-REPORT.md | State-System Pilot — Final Report | doc | AUTHORITATIVE | accepted | research/evidence/EV-HN-2026-0001; research/CHRONOLOGY.md | referenced | EV-HN-2026-0001 | Establishes the actual architectural layering (semantic core, hosts) with a trustworthy date (2026-08-30) | Not copied verbatim; cited and referenced |
| MIG-003 | helix-note-application | experiment/boundary-authority-v1 (also observed-value-boundary-amplification, agent-cost-comparison-v3) | a7639d8 | docs/state-system/HELIXNOTE-SEMANTIC-BOUNDARY-INVESTIGATION.md | Semantic Boundary Investigation | doc | AUTHORITATIVE | accepted | doctrine/BOUNDARY-PRESERVATION.md; research/evidence/EV-HN-2026-0002 | summarized | EV-HN-2026-0002, TH-SDE-2026-0002 | Direct source of failure-class taxonomy, three-contract model, wire-contract rule | NOT reachable from `main`; must be fetched from an experiment branch. Flagged as a provenance risk if those branches are ever deleted |
| MIG-004 | helix-note-application | experiment/observed-value-boundary-amplification | a8d5a4f | docs/state-system/HELIXNOTE-EXPERIMENT-1-OBSERVED-VALUE-BOUNDARY-AMPLIFICATION.md | Controlled Experiment 1 | doc | RAW EVIDENCE / EXPERIMENT OUTPUT | accepted | research/evidence/EV-HN-2026-0003 | summarized with figures preserved exactly | EV-HN-2026-0003, HY-SDE-2026-0001..0002, TH-SDE-2026-0004 | First controlled measurement of MDR/BCA | Figures (66.7%, 4.0) reproduced exactly, not recomputed |
| MIG-005 | helix-note-application | experiment/boundary-authority-v1 | 9733156 | docs/state-system/experiment-2-report.md, boundary-authority-design.md, boundary-authority-proofs.md, experiment-comparison.json | Controlled Experiment 2 | doc | RAW EVIDENCE / EXPERIMENT OUTPUT | accepted | research/evidence/EV-HN-2026-0004 | summarized with figures preserved exactly | EV-HN-2026-0004, HY-SDE-2026-0002..0005, TH-SDE-2026-0004 | Second controlled measurement; introduces Target A-D hardening and the residual no-op finding | |
| MIG-006 | helix-note-application | experiment/agent-cost-comparison-v3 | **8ac05fd** (corrected; supersedes 39bfa64) | docs/state-system/experiment-3-report.md, experiment-3-results.json, experiment-3-comparison.json, experiment-3-mission.md, experiment-3-predictions.md, experiment-3-metrics-schema.json | Controlled Experiment 3 (corrected) | doc | AUTHORITATIVE (supersedes an earlier draft within HelixNote's own history) | accepted | research/evidence/EV-HN-2026-0005 | summarized with figures preserved exactly, including the harness-telemetry incompleteness caveat | EV-HN-2026-0005, HY-SDE-2026-0002, TH-SDE-2026-0003, DF-SDE-2026-0002 | The mission's explicit authoritative source; corrects a log-count error and surfaces harness telemetry the original draft omitted | This migration's single most safety-critical citation — see DF-SDE-2026-0002 |
| MIG-007 | helix-note-application | experiment/agent-cost-comparison-v3 (also boundary-authority-v1 by inheritance of ancestry) | 39bfa64 | docs/state-system/experiment-3-report.md (original draft) | Controlled Experiment 3 (draft, pre-correction) | doc | SUPERSEDED | superseded | not migrated | not migrated | DF-SDE-2026-0002 | Explicitly superseded within HelixNote's own history by 8ac05fd | Not imported into SDE at all — recorded here only so a reader who finds 39bfa64 first knows it is superseded and by what |
| MIG-008 | helix-note-application | (any/none — not found) | N/A | `STATE-PROGRAMMING-EXPERIMENT-3-TO-ENGINEERING-TRANSITION_2026-09-01_2019_EDT.txt` | Experiment 3 → Engineering transition snapshot | doc | UNCERTAIN | not located | N/A | not migrated (could not locate) | DF-SDE-2026-0002 | Referenced by the migration mission as a transition snapshot | Searched via `git log --all --diff-filter=A` for the filename pattern across every fetched branch of both repositories, and the local filesystem. Not found. Presumed ephemeral/uncommitted. Corrected Experiment 3 (8ac05fd) takes precedence regardless, per mission instruction |
| MIG-009 | helix-note-application | main | 211462a | docs/research/*, research/frontier/*, research/operating-system/* | Clarity website / patient-caregiver UX research | doc set | APPLICATION-SPECIFIC | not migrated | N/A | not migrated | N/A | Product research unrelated to State Programming / SDE (a different HelixNote product workstream) | Explicitly out of scope; not State Programming research |
| MIG-010 | helix-note-application | main | 211462a | docs/state-system/HELIXNOTE-CORRECTION-STATE-MODEL.md, HELIXNOTE-HANDLER-INTEGRATION-DESIGN.md, HELIXNOTE-WASM-ENGINE-DESIGN.md, HELIXNOTE-CODE-QUALITY-REVIEW.md, and remaining docs/state-system/*.md not listed above | Slice 2-4 design/review documents | doc set | SUPPORTING | not individually migrated | N/A | referenced collectively via EV-HN-2026-0001 | EV-HN-2026-0001 | Support the Four-Tier layering claim (four hosts added without core changes) but are implementation-detail records, not paradigm/methodology sources | A future SDE maintainer wanting deeper HelixNote implementation detail should read these directly in HelixNote; SDE doctrine does not restate their content |

## Classification legend used above

AUTHORITATIVE, SUPERSEDED, SUPPORTING, RAW EVIDENCE / EXPERIMENT OUTPUT,
DERIVED SUMMARY, SPECULATION, OPEN QUESTION, APPLICATION-SPECIFIC,
DUPLICATE, UNCERTAIN — per the migration mission's classification scheme.
No item was deleted; UNCERTAIN and not-located items are recorded, not
discarded.

## Gaps (explicitly not migrated, with reason)

1. **MIG-008** — transition artifact not located. See row above and
   `DF-SDE-2026-0002`.
2. **MIG-009** — Clarity website / patient-caregiver research is a separate
   HelixNote product workstream, not State Programming research. Correctly
   out of scope for this migration.
3. **Experiment 1 and Experiment 2 remote tags** could not be verified as
   pushed (`state-programming-observed-value-experiment-v1` and
   `state-programming-boundary-authority-experiment-v2` both hit the same
   HTTP 403 tag-push policy restriction Experiment 3 also hit). They exist
   on the recorded commit SHAs only, reachable via branch history, not via
   `git tag` on a fresh clone that only fetches tags. This migration
   verified reachability via commit SHA directly, not via tag.
4. **Individual full REPs per experiment** (as opposed to the consolidated
   evidence records and the single migration REP `RP-SDE-2026-0001`) were
   not produced in this bootstrap, per the artifact-threshold guidance in
   `docs/00-governance/Agent-Operating-Manual.md` ("do not create
   ceremonial records with no durable information") — the evidence records
   plus the migration REP already satisfy the REP specification's
   reconstruction standard for this migration's own scope. A future
   maintainer wanting a dedicated Experiment 1/2/3 REP each should open a
   new ROS work item for it explicitly (see `WI-0002`/`WI-0003`/`WI-0004`
   completion notes).

## Provenance risk flagged for future action

`HELIXNOTE-SEMANTIC-BOUNDARY-INVESTIGATION.md` (MIG-003) and the Experiment
1/2/3 source documents (MIG-004/005/006/007) live on HelixNote experiment
branches that are **not** merged into `main`. If those branches are ever
deleted, this migration's citations to them become unreachable even though
the SDE evidence records here preserve their content. Recommend HelixNote's
own maintainers either merge or tag-protect these branches — recorded here
as an observation for the HelixNote repository, not acted on directly, per
this migration's read-only mandate for HelixNote.
