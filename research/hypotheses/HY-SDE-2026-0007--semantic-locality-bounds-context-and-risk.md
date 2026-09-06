---
id: HY-SDE-2026-0007
title: Semantic structural locality reduces context acquisition and regression risk
research_area: state-directed-engineering
status: active
type: hypothesis
disposition: unresolved
confidence: low
confidence_estimate: 0.35
author_agent: OpenAI Codex (runtime model identifier not exposed)
evidence_for: [EV-SDE-2026-0006]
evidence_against: []
related_theories: [TH-SDE-2026-0005]
supersedes: []
superseded_by: []
created: 2026-09-05
updated: 2026-09-05
tags: [structural-locality, context-surface, regression-risk]
---

# HY-SDE-2026-0007

## Statement

For equivalent feature changes, implementations organized into bounded
semantic areas and responsibility clusters will require less actual context
acquisition and will introduce fewer unrelated regressions than implementations
that centralize unrelated state, transitions, effects, and presentation logic.

## Mechanism

Explicit ownership, directional dependencies, local contracts, and local tests
should reduce the amount of unrelated material required to make and verify a
change. Physical decomposition helps only when it follows semantic
responsibility and preserves a singular authority.

## Predictions

- Fewer unrelated or undeclared files are read before a valid change.
- Fewer cross-boundary edits and repair loops occur for routine feature work.
- Equivalent changes have a smaller Actual Context Surface.
- Regression rates are lower without reducing required behavioral evidence.

## Evidence that would support it

A preregistered comparison of logically equivalent centralized and
semantically decomposed implementations showing consistent reductions in
context expansion and unrelated regressions across repeated tasks.

## Evidence that would contradict it

No material context/correctness difference, or worse results from the
decomposed condition due to navigation overhead, manifest drift, or excessive
fragmentation.

## Tests performed and results

None. `EV-SDE-2026-0006` supplies motivating observations and engineering
rationale, not a controlled test.

## Falsification attempts

Considered the counterexamples explicitly identified in the notes: a small
file can have a large Context Surface; a larger cohesive unit can be locally
understandable; and splitting by type/file can increase navigation without
reducing semantic coupling. These prevent using raw file count or LOC as the
hypothesis treatment.

## Current assessment

Unresolved, Low confidence (0.35). Suitable for architectural guidance and
measurement, not a general claim of cost or correctness improvement.

## Next experiment

Compare the same frozen feature changes against equivalent centralized and
semantically decomposed implementations. Capture T0–T6 telemetry and classify
inside-boundary, declared-dependency, undeclared-dependency, unrelated, and
cross-boundary activity contemporaneously.

