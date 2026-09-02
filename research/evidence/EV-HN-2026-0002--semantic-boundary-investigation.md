---
id: EV-HN-2026-0002
title: HelixNote Semantic Boundary Investigation — failure classes, three-contract model, wire contract findings
status: accepted
type: evidence
source_repository: kemiller2002/helix-note-application
source_branch: experiment/boundary-authority-v1 (and experiment/observed-value-boundary-amplification, experiment/agent-cost-comparison-v3 — same file, same commit, reachable from all three)
source_commit: a7639d88cc958c022712ca1363e0a955a30ed8bf
source_paths:
  - docs/state-system/HELIXNOTE-SEMANTIC-BOUNDARY-INVESTIGATION.md
collection_date: 2026-09-02
method: direct repository read of the committed document via git show at the named commit
observation_type: direct-observation
created: 2026-09-02
updated: 2026-09-02
tags: [boundary, wire-contract, representation-collapse, three-contract-model, helixnote, migration]
---

# Evidence: HelixNote Semantic Boundary Investigation

## Provenance

Commit `a7639d8` ("Investigate the typed boundary gap between API, kernel,
and WASM"), dated **2026-09-01 14:30:14 UTC**. This commit is **not** an
ancestor of HelixNote's `main` branch (`git merge-base --is-ancestor a7639d8
origin/main` returns false); it is reachable only from the experiment
branches (`experiment/boundary-authority-v1`,
`experiment/observed-value-boundary-amplification`,
`experiment/agent-cost-comparison-v3`). Any future reader working from a
checkout of `main` alone will not find this file; it must be fetched from one
of those branches.

## Direct observations

The document investigates four live boundary failures (Failures A-D) with
experiments actually built and executed (BP-001 through BP-004, in the
investigation's own scratch environment, not touching the live HelixNote
repository or database):

| Failure | Classification |
|---|---|
| A. GET request emitted with a body | Effect-model defect (wire representation of an HTTP effect permitted an illegal combination) |
| B. Client expects an endpoint that does not exist | Route-contract defect (two independently authored string literals, no shared source of truth) |
| C. F# `option` leaking across the JSON boundary (two live instances) | Serialization defect (producing/consuming code paths used different serializer configurations for the same boundary type) |
| D. Projection/field-mapping whitelist missing a case | Projection-contract defect (a duplicated, independently-maintained closed-set mapping expressed over an open type instead of the actual closed type) |

**Refined finding (the document's own, after testing and partially refuting
its own hypothesis):** two failure classes, not one:

1. **Representation collapse** (A, C, D) — a value closed/constrained on one
   side of a boundary becomes open/weaker on the other side.
2. **Uncoordinated duplication** (B, and D's deeper cause) — two
   independently maintained descriptions of the same fact, with no mechanism
   forcing agreement.

The document explicitly tested and rejected a single unifying "Semantic
Boundary Collapse" hypothesis (Deliverable 3), reporting Failure B as a
genuine counterexample rather than smoothing it into the pattern.

**Three-contract model (Deliverable 5):** Semantic Contract (unchanged,
already works), Host Contract (tightly cooperating internal components;
explicit hand-written tagged-JSON rendering, no default serializer, closed
effect algebra, route agreement checked by automated test), Public
Integration Contract (OpenAPI-shaped, resource-and-verb endpoints, no F#/DU/
WASM/Four-Tier vocabulary visible externally).

**Standards comparison (Deliverable 4) and specification candidates
(Deliverable 7):** none of the four failures require inventing a new
standard; each is addressed by an existing mechanism (closed effect algebra,
route-contract test, explicit tagged-JSON contract, or matching over the
closed domain type). Principle 8 ("a shared host-language contracts assembly
is a sufficient boundary mechanism for a same-language pair") is explicitly
**contradicted** by the investigation's own BP-002/Deliverable 2
reproduction: the identical shared F# type produced three different wire
behaviors depending on call path, inside one process, one language, one
framework.

Enforcement-strength differences across host languages (F#/Rust/Java: hard
compile-time exhaustiveness; TypeScript: real but idiom-dependent; C#: weak
by default) were measured directly (BP-001, BP-003) across five languages
with zero shared code between them.

## Supported claims

- Representation collapse and uncoordinated duplication are two distinct
  failure mechanisms that compound but require different fixes.
- Wire representations must not rely on a host language's or framework's
  default serializer.
- A shared host-language type is not sufficient boundary protection even
  within one language and one process.
- Enforcement strength for closed-alternative preservation varies materially
  by host language; the semantic principle is language-independent, its
  enforcement strength is not.

## Contradicted / not supported

- The single unifying "Semantic Boundary Collapse" hypothesis is
  contradicted by Failure B and is not carried into SDE doctrine as a single
  mechanism; SDE doctrine preserves the two-class split.

## Quality and limitations

- All four experiments (BP-001 to BP-004) were run in the investigation's own
  scratch environment, not against the live HelixNote database — a
  deliberate isolation choice, not a limitation of rigor, but it means these
  are controlled micro-experiments, not observations of the failures
  recurring in production.
- Cross-language claims (Rust, Java, TypeScript, C#) were tested with
  single, small reproductions per language — sufficient to demonstrate the
  mechanism exists, not a survey of every language's edge cases.
