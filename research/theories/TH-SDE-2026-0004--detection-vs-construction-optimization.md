---
id: TH-SDE-2026-0004
title: Detection optimization vs. construction optimization
status: supported
type: theory
confidence: high
confidence_estimate: 0.70
confidence_rationale: "Directly demonstrated by three independent BCA replications at an identical value (4.0), showing detection improved while volume did not."
evidence_for: [EV-HN-2026-0003, EV-HN-2026-0004, EV-HN-2026-0005]
related_documents: [doctrine/EVIDENCE-TO-ENGINEERING-MAP.md, doctrine/CONTRADICTIONS-AND-DEPRECATED.md]
created: 2026-09-02
updated: 2026-09-02
tags: [bca, detection, construction, doctrine]
---

# TH-SDE-2026-0004 — Detection optimization is not construction optimization

## Statement

Two distinct kinds of architectural improvement exist and must not be
conflated. **Detection optimization** makes an already-necessary change
visible earlier or mechanically (exhaustiveness checks, architecture checks,
contract agreement checks, persistence agreement checks). **Construction
optimization** reduces how many representations or implementation locations
must exist at all. HelixNote's research program has produced meaningful
evidence for detection-optimization gains. It has **not** demonstrated a
reduction in total boundary propagation — Boundary Change Amplification has
remained 4.0 across three separate experiments.

## Grounding

- Experiment 1: BCA = 4.0 [EV-HN-2026-0003].
- Experiment 2: BCA = 4.0, unchanged despite MDR rising 66.7% → 100%
  [EV-HN-2026-0004].
- Experiment 3: BCA = 4.0 in both conditions [EV-HN-2026-0005].

Three independent replications, three separate `ObservedValue` cases, two
separate architectures, one identical figure. Target B in Experiment 2 is a
partial counter-note worth preserving precisely: it *eliminated* one
required site outright (a construction-optimization effect on that single
site) rather than only mechanizing its discovery — but this did not move the
aggregate BCA figure, which stayed 4.0.

## Implication for SDE doctrine

Do not state "State Programming reduces the number of boundary files that
must change" — this is directly contradicted by the evidence. Treat reducing
or routinizing boundary amplification as an **open, future engineering
target**, not a solved problem, and do not attempt to solve it during this
migration bootstrap (see `research/migration/STATE-PROGRAMMING-TO-SDE-MIGRATION-MANIFEST.md`
and mission Working Principle: "Do not optimize what has not yet been shown
to be a recurring engineering problem" combined with the explicit instruction
not to redesign architecture during migration).

## Status

`supported`.
