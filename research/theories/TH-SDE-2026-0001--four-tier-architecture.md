---
id: TH-SDE-2026-0001
title: Four-Tier Architecture (semantic model / transition / orchestration / host)
status: supported
type: theory
confidence: high
confidence_estimate: 0.75
confidence_rationale: "Grounded in an enforced, real codebase layering (netstandard2.0 isolation, passing architecture check) across multiple hosts, replicated across three experiments' worth of change trials."
evidence_for: [EV-HN-2026-0001]
related_documents: [doctrine/FOUR-TIER-ARCHITECTURE.md]
created: 2026-09-02
updated: 2026-09-02
tags: [four-tier, architecture, doctrine]
---

# TH-SDE-2026-0001 — Four-Tier Architecture

## Statement

Software built under State Programming principles separates responsibility
into four dependency-ordered tiers: Semantic Model (what can be true), State
Transition/Domain Execution (what legal change may happen), Application/
Orchestration (coordination and boundary translation), and Host/External
Effects (what actually happened). Dependencies point one direction only:
Host → Application → Transition → Semantic Model.

## Grounding and an explicit naming disambiguation

This tier vocabulary (Semantic Model / Transition / Orchestration / Host) is
an **SDE-migration-era synthesis**, assigned during this bootstrap to name a
layering that is directly observable in HelixNote's actual, enforced
codebase structure [EV-HN-2026-0001] — `domain/HelixNote.Semantic`
(`netstandard2.0`-isolated, referencing only `FSharp.Core`), separate host
adapters (`.Host.Postgres`, `.Host.Wasm`), and an orchestrating API layer.

**This is not the same concept as HelixNote's own "Four-Tier State-System
Model"** (`HELIXNOTE-FOUR-TIER-CONFORMANCE-AUDIT.md`, attributed there to an
external "Echelon Foundry" brief), which classifies **kinds of state**
(Domain/Entity, Workflow/Process, Effect/External, Presentation/Interaction)
— all of which live inside what this theory calls Tier 1 (Semantic Model),
except Presentation/Interaction, which that document itself excludes from
the core. The two "four tiers" answer different questions (what kind of
state is this? vs. where does this code live and what may it depend on?) and
must not be merged. See [EV-HN-2026-0001] for the full disambiguation.

## Confidence rationale

High-medium. The architectural isolation itself is directly, repeatedly
verified (`check-semantic-architecture.sh` PASSED across Experiments 1, 2,
and both conditions of Experiment 3). The specific four-way tier split
(rather than, say, a three-way core/host/UI split) is a reasonable and
useful distillation of that structure but has not itself been the subject of
a dedicated comparative experiment against an alternative tiering.

## Known limitations

- Validated on one application (HelixNote), one primary language (F#), one
  storage technology (PostgreSQL), one additional host (WASM/browser).
- Language-neutrality of the tier *concept* is doctrine, not yet
  independently tested outside the F#/.NET ecosystem — see
  `doctrine/STATE-PROGRAMMING.md` "Language Neutrality."

## Status

`supported` — not `established`, per `framework/protocols/ARTIFACT-LIFECYCLE.md`'s
theory maturity ladder (`candidate -> supported -> established -> challenged
-> superseded | rejected`). Promotion to `established` should follow
independent replication outside HelixNote (see WI for first engineering
validation).
