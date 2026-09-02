---
id: TH-SDE-2026-0003
title: Mechanical Discovery Rate is not equivalent to engineering cost
status: supported
type: theory
confidence: {label: medium, estimate: 0.60, rationale: "Directly demonstrated in one controlled trial (Experiment 3); the two proxies moved in opposite directions, which is strong evidence they are not the same construct, but a single trial cannot establish how often this divergence occurs."}
evidence_for: [EV-HN-2026-0005]
related_documents: [doctrine/STATE-DIRECTED-ENGINEERING.md, doctrine/EVIDENCE-TO-ENGINEERING-MAP.md]
created: 2026-09-02
updated: 2026-09-02
tags: [mdr, cost, experiment-3, doctrine]
---

# TH-SDE-2026-0003 — Mechanical Discovery Rate is not equivalent to engineering cost

## Statement

A higher Mechanical Discovery Rate (more required sites found via compiler/
architecture/contract-check failure rather than manual search) is not proof
of lower engineering cost, and a lower MDR is not proof an architecture
failed to reduce engineering effort. Mechanical discovery is one possible
cost-reduction mechanism, not the definition of efficiency.

## Grounding

Experiment 3 [EV-HN-2026-0005]: Condition B (hardened architecture) had a
**lower** as-experienced MDR than Condition A (31.6% vs. 42.1%) while
simultaneously having **substantially lower** search-operation and
repair-loop costs (-63%, -50%). If MDR were a reliable proxy for engineering
cost, these two measures should have moved together; they moved in opposite
directions in this trial.

## Why this happened (mechanism, not just observation)

Two identifiable causes, both confirmed directly rather than inferred:
(1) roughly a third of this mutation's required sites fell in a tier
neither architecture mechanically guards (API/HTTP); (2) three sites that
*were* genuinely mechanically guarded on the hardened branch were found by
the executing agent reading ahead of the compiler, so the mechanism never
actually fired as the cause of discovery for those sites, even though it
would have. Crediting those three sites to the architecture's structural
capability (the "architecture-potential" MDR variant) raises Condition B to
52.6%, above Condition A — confirming the hardening *does* provide more
structural coverage, while showing that coverage was not fully realized in
this specific agent's actual behavior.

## Implication for SDE doctrine

Engineering metrics (`method/ENGINEERING-METRICS.md`) must track search
operations, repair loops, and MDR as **separate** proxies, never collapse
them into one "efficiency" number, and must record both an as-experienced
and an architecture-potential MDR where the distinction is measurable.
Construction Method guidance that says "prefer compiling before broad
search" (see `method/CONSTRUCTION-METHOD-v0.1.md`) exists precisely because
an agent's own investigation strategy determines how much of a hardened
architecture's potential benefit is actually realized.

## Confidence rationale

Medium. One trial demonstrated the divergence clearly and mechanistically;
no trial has yet measured how often this divergence recurs across different
mutations, architectures, or agent strategies.

## Status

`supported`.
