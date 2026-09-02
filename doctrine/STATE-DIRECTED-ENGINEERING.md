---
id: SDE-DOCTRINE-002
title: State-Directed Engineering
status: accepted
version: 0.1.0
created: 2026-09-02
updated: 2026-09-02
related_documents:
  - doctrine/STATE-PROGRAMMING.md
  - method/CONSTRUCTION-METHOD-v0.1.md
  - method/CHANGE-CLASSIFICATION.md
supersedes: []
superseded_by: []
tags: [doctrine, sde, methodology]
---

# State-Directed Engineering (SDE)

> State Programming defines the constraints. State-Directed Engineering
> defines how we work within them.

## What SDE is

State-Directed Engineering is the engineering methodology for building
software using State Programming principles. It is concerned with:

- how requirements are analyzed;
- how changes are classified (see
  [`method/CHANGE-CLASSIFICATION.md`](../method/CHANGE-CLASSIFICATION.md));
- where implementation begins;
- how mechanical feedback directs work;
- when searching the repository is appropriate, and when it substitutes for
  a mechanism that should exist instead;
- how boundaries are handled (see
  [`BOUNDARY-PRESERVATION.md`](BOUNDARY-PRESERVATION.md));
- how software is verified (see
  [`method/VERIFICATION-METHOD.md`](../method/VERIFICATION-METHOD.md));
- how engineering work stops;
- how work and evidence are recorded;
- how agents or humans repeatedly construct software under these
  constraints (see
  [`method/AGENT-EXECUTION-RULES.md`](../method/AGENT-EXECUTION-RULES.md)).

## Status of this document

**Provisional / Engineering Validation.** SDE v0.1 is scaffolded from three
HelixNote controlled experiments. It has not yet been validated as a
repeatable engineering practice on an application other than HelixNote. See
`method/FIRST-VALIDATION-DESIGN.md` for the design of that validation
(not yet executed) and Working Principle 33 of the original migration
mission: do not solve that validation during this bootstrap.

## Why SDE exists as separate from State Programming

State Programming can be true of a codebase's *architecture* without saying
anything about how an agent or engineer should *work* inside it.
Experiment 3 [EV-HN-2026-0005] is the direct evidence for why this
separation matters: the same hardened architecture produced *worse*
as-experienced Mechanical Discovery Rate than the baseline, for one
executing agent, because that agent's own working strategy (read broadly,
then edit) did not expose itself to the architecture's own mechanical
feedback before finding the same sites another way. The architecture was
identical; the outcome differed because of *how the agent worked*. That is
an engineering-methodology question, not an architecture question — which
is exactly why SDE, not State Programming alone, has to answer it (see
`method/AGENT-EXECUTION-RULES.md`).

## Confidence classes used throughout SDE

Every SDE rule carries one of the following statuses (see
[`doctrine/EVIDENCE-TO-ENGINEERING-MAP.md`](EVIDENCE-TO-ENGINEERING-MAP.md)
for the full mapping):

| Status | Meaning |
|---|---|
| REQUIRED | Strong enough and fundamental enough that SDE depends on it. |
| RECOMMENDED | Evidence-backed or strongly justified, but contextual exceptions may exist. |
| EXPERIMENTAL | Promising practice requiring further engineering validation. |
| RESEARCH ONLY | Not yet suitable as normal engineering guidance. |
| DEPRECATED | Previously considered but contradicted or superseded — see `CONTRADICTIONS-AND-DEPRECATED.md`. |

## Keeping research out of normal agent context

A normal engineering agent constructing software under SDE does not need to
read HelixNote's full experimental archive. The intended layering:

```
Researcher              -> full evidence / journals / REPs (research/)
SDE maintainer          -> doctrine + evidence map + research as needed
Normal engineering agent -> Construction Method + project requirements
                             + architecture rules + verification rules
                             + relevant templates (method/, templates/sde/)
```

The research explains WHY a rule exists. `method/` explains WHAT TO DO. An
engineering agent working on a real project should be able to follow
`method/CONSTRUCTION-METHOD-v0.1.md` end to end without opening
`research/evidence/` unless something in the method itself is unclear or
contested.

## Relationship to ROS

ROS ([`../AGENTS.md`](../AGENTS.md), [`../docs/00-governance/`](../docs/00-governance/))
manages work items, research artifact lifecycle, and validation for this
repository. SDE defines the engineering method content that ROS's process
is used to produce and record. SDE does not create a second work-tracking
system; ROS's `./ros` CLI and backlog (`./ros work`, `./ros add`) are the
only work-item authority in this repository.
