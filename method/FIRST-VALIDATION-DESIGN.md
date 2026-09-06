---
id: SDE-METHOD-006
title: First Engineering Validation — Design (not executed)
status: draft
version: 0.2.0
created: 2026-09-02
updated: 2026-09-05
related_documents:
  - method/CONSTRUCTION-METHOD-v0.2.md
  - method/NAVIGATION-AND-CONTEXT.md
  - doctrine/STATE-DIRECTED-ENGINEERING.md
tags: [method, validation, future-work]
---

# First Engineering Validation — Design

**This design is not executed.** Per the migration mission's explicit
instruction, the original bootstrap set validation up as subsequent work and
did not run it. The notes reviewed for v0.2 mention a greenfield trial, but no
accepted experiment/evidence record for that trial exists here; this document
therefore remains explicitly prospective. Execution requires its own ROS work
item (`WI-0019` is currently ready, not active).

## Question this validation must answer

> Can a fresh-context agent, given the SDE construction method and a normal
> project repository, take a real requirement from requirement to verified
> software with low search, low rework, and predictable verification?

## Why a new application, not HelixNote

HelixNote is the source of the evidence the Construction Method was built
from. Validating the method on HelixNote risks the method appearing to work
because the agent (or the person writing the trial) is drawing on
accumulated HelixNote-specific familiarity, not because the method itself
transfers. Prefer a new application the executing agent has no prior
exposure to.

## Design sketch

1. **Choose an application** unrelated to HelixNote, small enough to bound
   a trial, with at least one genuine multi-tier boundary (a persistence
   layer and an external-facing API, at minimum) so Change Classification
   and the Four-Tier Architecture are actually exercised, not vacuous.
2. **Establish or adopt an equivalent architectural layering** (Four Tiers,
   or a justified subset) with at least one Boundary Preservation mechanism
   in place before the trial begins, so the trial is testing the method,
   not asking the agent to invent the architecture from nothing.
3. **Establish the v0.2 navigation treatment**: a repository semantic map,
   real feature boundaries, feature manifests where ownership is nontrivial,
   declared dependencies, and discoverable tests. Freeze these before the
   trial; do not create them after seeing the agent's discovery path.
4. **Select a real, bounded requirement** comparable in shape to the
   `ObservedValue`-style mutations used across Experiments 1-3 (a new
   closed-alternative case that crosses at least a persistence and an
   API boundary), frozen and pre-registered before the trial starts, as
   Experiment 3 did [EV-HN-2026-0005].
5. **Give the executing agent only**: the requirement, the project's own
   repository, `method/CONSTRUCTION-METHOD-v0.2.md`, its semantic map and
   relevant feature manifest,
   `method/CHANGE-CLASSIFICATION.md`, `method/VERIFICATION-METHOD.md`,
   `method/NAVIGATION-AND-CONTEXT.md`,
   `method/AGENT-EXECUTION-RULES.md`, and whatever project-specific
   architecture/verification rules already exist. Explicitly withhold
   `research/` — this is the point of the "keep research out of normal
   agent context" design objective in
   `doctrine/STATE-DIRECTED-ENGINEERING.md`.
6. **Measure** the priority engineering measures from
   `method/ENGINEERING-METRICS.md`, labeling every cost figure by evidence
   class per that document's rule. Capture harness-level telemetry if
   available, with the same interruption/completeness caveats Experiment 3
   established. Capture cumulative T0–T6 checkpoints and pre-register the
   counting units for Context Surface, CER, or DE if those metrics are used.
7. **Compare against a declared baseline** — e.g., the same requirement
   implemented without following the Construction Method's explicit
   ordering (compile-then-search vs. an unconstrained agent strategy),
   analogous to Experiment 3's own paired-condition design but now testing
   the *method*, not the *architecture*.
8. **Freeze method association per condition.** A v0.1 comparison, if used,
   receives the unchanged v0.1 method; v0.2 is a separate treatment. Do not
   retrofit maps, manifests, or context metrics into completed work.
9. **Do not declare success or failure from a single trial.** Per this
   research program's own repeated caution (Experiment 3 §34), a single
   paired trial is a case study, not a statistically powered comparison.

## Stopping / success criteria for the validation itself (not the method)

The validation is complete when it produces a comparable evidence record
(evidence, hypothesis, and either a supported or contradicted theory update)
for at least one Construction Method transition — most valuably, the
combined local-first / mechanical-first navigation sequence, specifically
because the feature-manifest and context-expansion effects have not yet been
tested and Experiment 3 did not deliberately control investigation strategy.

## Explicit non-goals of this design document

This document does not select the specific application, requirement, or
trial date — those are decisions for whoever begins the corresponding ROS
work item (see `research/migration/STATE-PROGRAMMING-TO-SDE-MIGRATION-MANIFEST.md`
and `WI-0019`), not decisions this methodology revision makes on their behalf.
