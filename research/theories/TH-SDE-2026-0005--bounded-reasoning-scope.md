---
id: TH-SDE-2026-0005
title: Bounded reasoning scope as an SDE design objective
research_area: state-directed-engineering
version: 1.0.0
status: candidate
type: theory
confidence: medium
confidence_estimate: 0.50
confidence_rationale: The component mechanisms have direct evidence and the structural/navigation synthesis has strong engineering rationale, but no controlled experiment yet establishes the unifying theory or its cost/correctness predictions.
derived_from: [EV-HN-2026-0001, EV-HN-2026-0002, EV-HN-2026-0004, EV-HN-2026-0005, EV-SDE-2026-0006]
supporting_evidence: [EV-HN-2026-0001, EV-HN-2026-0002, EV-HN-2026-0004, EV-HN-2026-0005, EV-SDE-2026-0006]
contradicting_evidence: []
related_hypotheses: [HY-SDE-2026-0006, HY-SDE-2026-0007, HY-SDE-2026-0008]
related_documents: [doctrine/STATE-DIRECTED-ENGINEERING.md, doctrine/STRUCTURAL-LOCALITY.md, method/NAVIGATION-AND-CONTEXT.md]
supersedes: []
superseded_by: []
created: 2026-09-05
updated: 2026-09-05
tags: [bounded-reasoning, structural-locality, navigation, verification]
---

# TH-SDE-2026-0005 — Bounded reasoning scope

## Theory statement

SDE mechanisms can be understood as bounding the information and inference
required to make a safe change:

- state constraints bound what may be true;
- transition, guard, and capability constraints bound what may happen;
- semantic authority and boundary contracts bound where decisions are made
  and how they travel;
- structural locality bounds where implementation responsibility lives;
- navigation contracts bound how that responsibility is discovered; and
- verification assigns each failure class to the earliest trustworthy
  mechanism capable of detecting it.

SDE should therefore treat **bounded reasoning scope** as an explicit design
objective for humans and machines. This organizing theory does not yet prove
that smaller Context Surface, lower CER, or local-first navigation causes
lower cost or higher correctness.

## Scope and boundary conditions

- Applies to software construction and modification under SDE, including
  presentation-state systems.
- Does not prescribe a language, framework, file count, universal LOC limit,
  custom DSL, or code generation.
- Does not prohibit cross-cutting changes or boundary crossing; it requires
  the expansion to be explicit and evidentiary.
- Optimizes coherent semantic context, not minimum raw text.

## Underlying mechanism

Explicit representations and boundaries reduce the set of plausible states,
actions, ownership locations, and verification mechanisms an engineer must
infer. Repository maps and manifests make the intended boundary discoverable;
execution telemetry exposes when the declared model was incomplete.

## Supported predictions

Mechanism-specific predictions already supported by accepted evidence:

- Closed semantic cases can make some propagation obligations compiler
  visible [`EV-HN-2026-0003` through `0005`].
- Explicit boundary mechanisms detect disagreement that compilation does not
  [`EV-HN-2026-0002`, `EV-HN-2026-0004`].
- Behavioral tests remain necessary for semantic no-ops
  [`EV-HN-2026-0004`, `EV-HN-2026-0005`].
- Mechanical discovery is not equivalent to total engineering cost
  [`TH-SDE-2026-0003`].

## Failed or untested predictions

- Cost reduction from bounded reasoning scope: untested.
- Lower regression rate from semantic structural decomposition: untested.
- Reduced discovery cost from maps/manifests: untested.
- CER as a predictor of quality or cost: untested.

## Supporting evidence

`EV-SDE-2026-0006` integrates the structural and navigation rationale with
the established mechanism-specific evidence. The approximately 7,000-line
Bolero case is a motivating architectural observation, not a replicated
comparison.

## Contradicting evidence

No direct experimental contradiction is recorded. Important counterexamples
constrain the theory: legitimate cross-cutting changes can have large context;
larger cohesive files can be safer than fragmented ones; and manifests can
become stale or omit actual dependencies.

## Alternative explanations

- Tool/model capability may explain navigation cost more strongly than
  repository structure.
- Familiarity, caches, test speed, or task shape may dominate outcomes.
- Manifests may merely move discovery work into documentation maintenance.
- Mechanical feedback may supply adequate routing without explicit maps in
  small repositories.

## Confidence rationale

Medium (0.50). The theory unifies several directly evidenced mechanisms and a
plausible architectural observation, but its central causal predictions await
controlled validation. Status remains `candidate`, not `supported` or
`established`.

## Open questions

1. How should Declared and Actual Context Surface be counted reproducibly?
2. When does manifest maintenance cost exceed routing value?
3. Which structural proxies transfer across languages and generated-code
   conventions?
4. Can dependency graphs or build metadata derive manifest fields safely?

## Required updates

Adopt the objective and its execution contracts in SDE v0.2, expose the
evidence class of each claim, and instrument future trials without turning CER
or LOC into quality gates.

