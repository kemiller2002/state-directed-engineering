---
id: DF-SDE-2026-0001
title: Adopt State-Directed Engineering as the engineering methodology, distinct from State Programming
status: accepted
type: decision-record
created: 2026-09-02
updated: 2026-09-02
tags: [governance, naming, scope]
---

# DF-SDE-2026-0001

## Context

HelixNote's research program produced a body of evidence about a programming
paradigm (explicit semantic states, legal transitions, invariants, evidence,
capabilities, obligations, uncertainty, boundary preservation — "State
Programming") and, separately, began accumulating knowledge about how to
*build* software under those constraints (how requirements are analyzed, how
changes are classified, when to search vs. compile, how work stops). This
repository is chartered to hold the durable, canonical form of the second
thing.

## Decision

State Programming and State-Directed Engineering (SDE) are maintained as
two distinct concepts, never silently merged:

- **State Programming** defines the constraints (the paradigm).
- **State-Directed Engineering** defines how we work within them (the
  methodology).

This repository (`state-directed-engineering`) is the canonical home of SDE.
HelixNote remains the source evidence repository for the experiments that
informed it and is not rewritten or stripped of research artifacts as part
of this decision.

## Alternatives considered

- Merge both concepts into one document/repository. Rejected: conflates a
  paradigm claim ("these constraints exist and are useful") with a
  methodology claim ("this is how to work within them"), making it
  impossible to revise one without implicitly relitigating the other.
- Treat HelixNote as the permanent home for both. Rejected: HelixNote is an
  application repository whose primary purpose is the application itself;
  a durable engineering methodology needs a repository whose primary
  purpose is the methodology, with its own governance (ROS) independent of
  any one application's lifecycle.

## Evidence

Mission framing (working principle, reproduced verbatim in doctrine):
"State Programming defines the constraints. State-Directed Engineering
defines how we work within them." This is a scoping decision, not an
evidentiary claim, and is recorded as `accepted` rather than tied to a
confidence label.

## Consequences

- `doctrine/STATE-PROGRAMMING.md` and `doctrine/STATE-DIRECTED-ENGINEERING.md`
  are maintained as separate documents.
- Future contradictions between paradigm-level and methodology-level claims
  must be resolved by asking which of the two concepts the claim actually
  belongs to, not by merging the documents.

## Reversibility

Low cost to reverse if evidence later shows the separation is not useful in
practice (e.g., if every methodology decision turns out to require
re-litigating a paradigm question) — would require a new Decision Record
superseding this one, not a silent edit.

## Status

`accepted`.
