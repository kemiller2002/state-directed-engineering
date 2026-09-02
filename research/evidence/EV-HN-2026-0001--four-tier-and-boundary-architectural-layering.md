---
id: EV-HN-2026-0001
title: HelixNote architectural layering (semantic core / hosts / orchestration) and its Four-Tier State-System Model audit
status: accepted
type: evidence
source_repository: kemiller2002/helix-note-application
source_branch: main
source_commit: 211462a90efb8c37b267d01362a44b0a8f9fbcaa
source_paths:
  - docs/state-system/HELIXNOTE-FOUR-TIER-CONFORMANCE-AUDIT.md
  - docs/state-system/HELIXNOTE-STATE-SYSTEM-PILOT-REPORT.md
  - docs/state-system/README.md
  - domain/HelixNote.Semantic/ (project structure)
collection_date: 2026-09-02
method: direct repository read of committed documents and project structure on the HelixNote main branch
observation_type: direct-observation
created: 2026-09-02
updated: 2026-09-02
tags: [four-tier, architecture, boundary, helixnote, migration]
---

# Evidence: HelixNote architectural layering and its own Four-Tier State-System Model audit

## Provenance

- Pilot final report dated **2026-08-30**, branch `claude/wasm-kernel-85d6h2`
  (`docs/state-system/HELIXNOTE-STATE-SYSTEM-PILOT-REPORT.md`).
- Conformance audit: `docs/state-system/HELIXNOTE-FOUR-TIER-CONFORMANCE-AUDIT.md`,
  described in the state-system README as "**Authoritative**" for conformance
  to what that document calls the "Echelon Foundry Four-Tier State-System
  Model brief."
- Both documents are present on HelixNote's `main` branch at commit
  `211462a90efb8c37b267d01362a44b0a8f9fbcaa` (the commit visible at the time
  of this migration).

## Direct observations

1. The actual codebase is physically layered as:
   - `domain/HelixNote.Semantic/` — targets `netstandard2.0`, referencing only
     `FSharp.Core`. Cannot reference Npgsql, ASP.NET Core, or Giraffe by
     construction of the target framework. Enforced additionally by
     `scripts/check-semantic-architecture.sh`, which the audit confirms
     "PASSED, all 4 sub-checks green."
   - `domain/HelixNote.Semantic.Host.Postgres/`, `HelixNote.Semantic.Host.Wasm/`,
     `HelixNote.Semantic.Host.Wasm.Browser/` — host adapters that hold storage,
     WASM, and browser-interop concerns.
   - `api/` — the Giraffe HTTP host, which as of "slice 3" dispatches commands
     to the core and executes the effects it returns (`HELIXNOTE-HANDLER-INTEGRATION-DESIGN.md`).
   - `web-bolero/`, `web/` — presentation/UI hosts.
2. The README's own stated rule: `domain/HelixNote.Semantic/` → "application
   meaning only: state, transitions, validation, capabilities, projections."
   `api/`, `web-bolero/`, `web/` → "hosts: storage, network, DOM, clock,
   identity."
3. **`HELIXNOTE-FOUR-TIER-CONFORMANCE-AUDIT.md` names a *different* four-tier
   concept than an architectural layering.** Its own "four tiers, as actually
   built" table (§1) is a **state-category taxonomy**, not a layering of
   implementation responsibility:

   | Tier (HelixNote's own naming) | What it classifies |
   |---|---|
   | 1. Domain / Entity | `Disposition = AwaitingReview \| Accepted \| Rejected` |
   | 2. Workflow / Process | `RunState = Queued \| Running \| Completed \| ...` |
   | 3. Effect / External | `RecordCommitment = NotCommitted \| CommitInFlight \| Committed \| ...` |
   | 4. Presentation / Interaction | deliberately absent from the core |

   All four of *these* categories live inside `domain/HelixNote.Semantic`
   (or are deliberately excluded from it, in the case of tier 4). This is a
   taxonomy of **kinds of state**, attributed to an external "Echelon
   Foundry" brief the document references but does not reproduce in this
   repository.

## Interpretation — required disambiguation

SDE's canonical "Four-Tier Architecture" doctrine (Semantic Model / State
Transition–Domain Execution / Application–Orchestration / Host–External
Effects; see `doctrine/FOUR-TIER-ARCHITECTURE.md`) is an **architectural
layering of responsibility** — it answers "where does this code live and what
may it depend on." It is evidenced directly by observation 1-2 above (the
actual project structure and the README's stated and enforced rule), **not**
by HelixNote's own "Four-Tier State-System Model" audit, which is a
same-named but conceptually distinct **state-category taxonomy** internal to
what SDE calls Tier 1 (Semantic Model).

This distinction was not stated in HelixNote's own documents and is recorded
here as an SDE-migration-era clarification, not a claim originating in
HelixNote. A reader who encounters `HELIXNOTE-FOUR-TIER-CONFORMANCE-AUDIT.md`
should not assume its "four tiers" are the same four tiers SDE's doctrine
names — they classify different things and should not be merged.

## Supported claims

- The architectural layering SDE's Four-Tier doctrine describes is directly
  observable in HelixNote's actual, still-enforced project structure
  (`check-semantic-architecture.sh` passing, `netstandard2.0` target,
  `README`'s stated rule).
- HelixNote independently developed and validated a *different*, state-kind
  taxonomy under the same "four-tier" name, sourced from an external brief.

## Contradicted / not supported

- Nothing in this evidence item contradicts SDE's Four-Tier Architecture
  doctrine; it supports the doctrine's grounding while flagging a naming
  collision that must not be silently merged.

## Quality and limitations

- Single-repository, single-project observation. No claim of generality to
  other Four-Tier-style architectures.
- The "Echelon Foundry" brief itself was not located in either repository;
  its content is known only through HelixNote's own audit against it and is
  not independently verified here.
