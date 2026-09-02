---
id: SDE-METHOD-006
title: First Engineering Validation — Design (not executed)
status: draft
version: 0.1.0
created: 2026-09-02
updated: 2026-09-02
related_documents:
  - method/CONSTRUCTION-METHOD-v0.1.md
  - doctrine/STATE-DIRECTED-ENGINEERING.md
tags: [method, validation, future-work]
---

# First Engineering Validation — Design

**This design is not executed.** Per the migration mission's explicit
instruction, this bootstrap sets the validation up as subsequent work and
does not run it. Execution requires its own ROS work item, explicitly
begun, separate from the migration work items this bootstrap completes.

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
3. **Select a real, bounded requirement** comparable in shape to the
   `ObservedValue`-style mutations used across Experiments 1-3 (a new
   closed-alternative case that crosses at least a persistence and an
   API boundary), frozen and pre-registered before the trial starts, as
   Experiment 3 did [EV-HN-2026-0005].
4. **Give the executing agent only**: the requirement, the project's own
   repository, `method/CONSTRUCTION-METHOD-v0.1.md`,
   `method/CHANGE-CLASSIFICATION.md`, `method/VERIFICATION-METHOD.md`,
   `method/AGENT-EXECUTION-RULES.md`, and whatever project-specific
   architecture/verification rules already exist. Explicitly withhold
   `research/` — this is the point of the "keep research out of normal
   agent context" design objective in
   `doctrine/STATE-DIRECTED-ENGINEERING.md`.
5. **Measure** the priority engineering measures from
   `method/ENGINEERING-METRICS.md`, labeling every cost figure by evidence
   class per that document's rule. Capture harness-level telemetry if
   available, with the same interruption/completeness caveats Experiment 3
   established.
6. **Compare against a declared baseline** — e.g., the same requirement
   implemented without following the Construction Method's explicit
   ordering (compile-then-search vs. an unconstrained agent strategy),
   analogous to Experiment 3's own paired-condition design but now testing
   the *method*, not the *architecture*.
7. **Do not declare success or failure from a single trial.** Per this
   research program's own repeated caution (Experiment 3 §34), a single
   paired trial is a case study, not a statistically powered comparison.

## Stopping / success criteria for the validation itself (not the method)

The validation is complete when it produces a comparable evidence record
(evidence, hypothesis, and either a supported or contradicted theory update)
for at least one Construction Method transition — most valuably, the
"compile before broad search" rule this bootstrap carried forward from
Experiment 3 as RECOMMENDED rather than REQUIRED, specifically because it
has not yet been tested with the investigation-strategy variable
deliberately controlled (Experiment 3's own §35 recommendation).

## Explicit non-goals of this design document

This document does not select the specific application, requirement, or
trial date — those are decisions for whoever begins the corresponding ROS
work item (see `research/migration/STATE-PROGRAMMING-TO-SDE-MIGRATION-MANIFEST.md`
and WI-0018), not decisions this migration bootstrap makes on their behalf.
