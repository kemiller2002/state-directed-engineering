---
id: SDE-DOCTRINE-007
title: Contradictions and Deprecated Ideas
status: accepted
version: 0.1.0
created: 2026-09-02
updated: 2026-09-02
related_documents:
  - doctrine/EVIDENCE-TO-ENGINEERING-MAP.md
tags: [doctrine, contradictions, deprecated]
---

# Contradictions and Deprecated Ideas

A mature engineering methodology preserves its own failures rather than
erasing them. Every entry here stays permanently, even after the idea is
well understood to be wrong, so a future agent re-deriving the same
plausible-sounding idea can find out immediately that it was already tested
and did not hold.

## Higher MDR automatically means lower engineering cost

**Status:** Contradicted.
**Contradicted by:** HelixNote Experiment 3 [EV-HN-2026-0005]. Condition B
had a *lower* as-experienced Mechanical Discovery Rate (31.6%) than
Condition A (42.1%) while simultaneously having substantially *lower*
search-operation and repair-loop costs (-63%, -50%). See
`research/theories/TH-SDE-2026-0003--*.md`.

## Boundary hardening reduces boundary change amplification

**Status:** Contradicted.
**Contradicted by:** Three independent replications, all measuring exactly
4.0 boundary files per semantic decision — Experiment 1 (baseline),
Experiment 2 (hardened, MDR 66.7%→100%, BCA unchanged), Experiment 3 (both
conditions) [EV-HN-2026-0003, EV-HN-2026-0004, EV-HN-2026-0005]. See
`research/theories/TH-SDE-2026-0004--*.md`.

## Experiment 3 proves a token/cost reduction from boundary hardening

**Status:** Unsupported (Open, not Contradicted — the true figure is
unknown, not known to be false).
**Reason:** Condition B's harness-counted telemetry (79 tool uses, 165,288
tokens, 15.01 minutes) covers only a resumed partial run following an
infrastructure-rate-limit interruption. Roughly 78% of Condition B's
eventual log already existed before the counted portion began. The true
total could plausibly match or exceed Condition A's (195 tool uses, 516,665
tokens, 36.43 minutes) [EV-HN-2026-0005, §39.1]. Never cite the raw
percentage reductions (59%/68%/59%) as a confirmed cost reduction.

## Experiment 3 proves an elapsed-time reduction from boundary hardening

**Status:** Unsupported (Open), for the same telemetry-incompleteness
reason above, *plus* two additional confounders that were not controlled:
~19-21 minutes of Condition A's 36.43-minute run was spent on three Bolero
client builds Condition B never had to run (a consequence of legitimate
mutation-equivalence asymmetry, not architecture), and Condition B ran
second in a shared container, potentially benefiting from warm NuGet/JIT
caches left by Condition A's own builds minutes earlier
[EV-HN-2026-0005, §39.3, §39.4].

## Compiler/architecture/contract-check protection proves behavioral correctness

**Status:** Contradicted.
**Contradicted by:** A structurally-present, semantically-inert fan-out arm
evaded the compiler, the architecture check, the schema agreement test, and
the field-vocabulary agreement test identically in Experiment 2 (Phase 20)
and both conditions of Experiment 3 (§17, §22). Caught only by integration
testing and direct SQL inspection, every time. See
`research/hypotheses/HY-SDE-2026-0002--*.md` (HY-SDE-2026-0005) and
`method/VERIFICATION-METHOD.md`.

## A single unifying "Semantic Boundary Collapse" mechanism

**Status:** Contradicted, refined.
**Contradicted by:** HelixNote's own Semantic Boundary Investigation
[EV-HN-2026-0002] explicitly tested this hypothesis against four real
failures and found one (Failure B, a missing endpoint) did not fit — there
was no "strong" representation that collapsed, only two independently
open-string authorities. Refined into two classes: Representation Collapse
and Uncoordinated Duplication. See `doctrine/BOUNDARY-PRESERVATION.md`.

## A shared host-language contracts assembly is sufficient boundary protection

**Status:** Contradicted.
**Contradicted by:** `EV-HN-2026-0002` Deliverable 2's reproduction: an
identical shared F# type produced three different wire behaviors depending
on call path, inside one process, one language, one framework — sharing the
type was orthogonal to the actual defect (a serializer call-path issue).

## HelixNote's "Four-Tier State-System Model" is the same concept as SDE's Four-Tier Architecture

**Status:** Not a research contradiction — a naming collision this
migration is required to prevent. HelixNote's own model (Domain/Entity,
Workflow/Process, Effect/External, Presentation/Interaction, from an
external "Echelon Foundry" brief) classifies kinds of state. SDE's Four-Tier
Architecture (Semantic Model / Transition / Orchestration / Host)
classifies architectural responsibility layers. See
`research/evidence/EV-HN-2026-0001--*.md` for the full disambiguation. Do
not merge these two in future doctrine revisions.
