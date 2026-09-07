---
identifier: EX-SDE-YYYY-NNNN
title:
research_area: state-directed-engineering
status: draft
confidence: {label: , estimate: , rationale: ""}
created: YYYY-MM-DD
---

# Engineering trial report — <short title>

Use this template for a controlled or semi-controlled comparison of two
SDE method or architecture variants (following the pattern established by
HelixNote's Experiments 1-3). For a single ordinary change, use
`completion-report.md` instead — this template is for trials whose purpose
is to produce reusable evidence, per
`docs/00-governance/Agent-Operating-Manual.md`'s artifact-threshold table
("Experiment record" row).

## Research questions

## Hypotheses (link HY- records)

## Conditions and starting state

| | Condition A | Condition B |
|---|---|---|
| Starting commit/tag | | |
| Architecture/method variant | | |
| Agent/provider/model/runtime | | |
| Telemetry authority and completeness window | | |

## Frozen mission text (verbatim, byte-identical across conditions)

## Metric definitions (freeze before either trial begins)

If Context Surface, CER, or Discovery Expansion is used, define the counting
unit, declared feature boundary, dependency categories, and treatment before
execution. Do not infer them from the result.

Reuse existing ROS/project/harness telemetry where available. Freeze each
metric's source, capability state, unit, scope, aggregation, and completeness
window at T0. Additional provider fields may be retained through a sanctioned
extension/raw layer, but the frozen comparison schema must not be changed
post-hoc to make one condition look more complete.

## Durable telemetry checkpoints

| Checkpoint | Timestamp | Cumulative authoritative metrics | Missing/unavailable metrics and why |
|---|---|---|---|
| T0 — experiment start | | | |
| T1 — instrumentation/bootstrap complete | | | |
| T2 — semantic foundation established | | | |
| T3 — first vertical slice complete | | | |
| T4 — implementation complete | | | |
| T5 — verification complete | | | |
| T6 — final completion | | | |

## Results

| Metric | Condition A | Condition B |
|---|---|---|

## Confounders

## Defects by class

| Defect | Domain/Product | Semantic | Boundary | Tooling/Build | Repository/Automation | Methodology | Experiment-Harness |
|---|---:|---:|---:|---:|---:|---:|---:|
| Count | | | | | | | |

## Context and architecture findings

- Declared vs. actual context:
- Undeclared dependencies:
- Cross-boundary edits:
- Manifest drift:
- Structural concentration:
- Duplicate semantic authority:

## Hypothesis dispositions

## What this trial does not show

## Evidence and theory registry updates (EV-/TH- IDs created or updated)
