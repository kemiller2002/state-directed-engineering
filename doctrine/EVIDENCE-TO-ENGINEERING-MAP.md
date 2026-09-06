---
id: SDE-DOCTRINE-006
title: Evidence-to-Engineering Map
status: accepted
version: 0.2.0
created: 2026-09-02
updated: 2026-09-05
related_documents:
  - doctrine/CONTRADICTIONS-AND-DEPRECATED.md
  - method/CONSTRUCTION-METHOD-v0.2.md
tags: [doctrine, traceability, evidence]
---

# Evidence-to-Engineering Map

Purpose: every SDE engineering rule must be able to answer **"why is this
rule part of SDE?"** with a citable evidence trail, not an assertion. Rows
are never promoted from `Open` to a REQUIRED/RECOMMENDED confidence class
without new supporting evidence and a recorded reason.

| Engineering proposition | Confidence class | Evidence state | Evidence / experiments | Theory / hypothesis | Known counterexamples / limitations |
|---|---|---|---|---|---|
| Change semantic authority before propagating outward (Semantic Change class starts at Tier 1) | REQUIRED | Supported | EV-HN-2026-0003, EV-HN-2026-0004, EV-HN-2026-0005 | TH-SDE-2026-0001 | None found; not tested outside HelixNote/F#. |
| Compile/build before broad repository search, when the architecture provides exhaustiveness checking | RECOMMENDED | Provisional / supported by Experiment 3 procedural evidence | EV-HN-2026-0005 | HY-SDE-2026-0006 | Only substitutes for search in tiers the hardening actually covers (API/HTTP tier was unguarded in Experiment 3); an agent that reads broadly first under-realizes this benefit. |
| Boundary facts need one authority, a derivation, or a mechanical agreement check | REQUIRED | Supported | EV-HN-2026-0002 | TH-SDE-2026-0002 | Not tested on failure shapes beyond the four reproduced in the source investigation. |
| Behavioral/present-but-wrong implementations require behavioral (integration) verification, not just compile/architecture/contract checks | REQUIRED | Supported | EV-HN-2026-0004, EV-HN-2026-0005 | HY-SDE-2026-0003, HY-SDE-2026-0005 | Replicated twice (Experiment 2 Phase 20, Experiment 3 §22/§28) — the strongest-replicated finding in this map. |
| Boundary hardening reduces search operations and repair loops | RECOMMENDED | Supported, single trial | EV-HN-2026-0005 | HY-SDE-2026-0001, HY-SDE-2026-0002 | One paired trial; unique-files-inspected did not move the same way as search operations. |
| Boundary hardening reduces total boundary propagation (BCA) | — | **Contradicted** | EV-HN-2026-0003, EV-HN-2026-0004, EV-HN-2026-0005 | TH-SDE-2026-0004, HY-SDE-2026-0002 | 4.0 replicated three times, identically, across two architectures. Do not state boundary hardening reduces boundary-file count. |
| Higher Mechanical Discovery Rate means lower engineering cost | — | **Contradicted** | EV-HN-2026-0005 | TH-SDE-2026-0003 | Condition B had lower as-experienced MDR yet lower search/repair-loop cost in the same trial. |
| Exhaustiveness/architecture/contract checks are sufficient for behavioral correctness | — | **Contradicted** | EV-HN-2026-0004, EV-HN-2026-0005 | HY-SDE-2026-0002, HY-SDE-2026-0005 | The present-but-inert fan-out arm passed every mechanical check identically in both experiments. |
| API/HTTP boundaries are sufficiently mechanically protected by existing HelixNote mechanisms | — | **Contradicted / open** | EV-HN-2026-0005 | — | Zero mechanical guard exists for this tier on either architecture tested; BS3-01 in the source report sketches a candidate mechanism, not yet built or tested. |
| State Programming reduces AI-agent token/wall-clock cost | — | **Open** | EV-HN-2026-0005 | — | Condition B's telemetry covers only a resumed partial run (~78% of its own log preceded the counted portion); true total cost is unknown and could match or exceed the baseline. Never cite the raw 59%/68%/59% reduction figures as a confirmed result. |
| A shared host-language "contracts assembly" is sufficient boundary protection for a same-language pair | — | **Contradicted** | EV-HN-2026-0002 | TH-SDE-2026-0002 | Deliverable 2's reproduction: the identical shared F# type produced three different wire behaviors depending on call path, inside one process. |
| Public Integration Contracts must not require adopting State Programming to integrate | RECOMMENDED (not REQUIRED) | Plausible, not directly tested | EV-HN-2026-0002 | TH-SDE-2026-0002 | Source investigation's own principle 6 rating: "plausible but not directly tested." |
| The Construction Method's fixed ordering (compile → architecture → boundary/contract → behavior → search → integration) | EXPERIMENTAL | Provisional, assembled from the above rows, not independently trial-tested as one ordered workflow | EV-HN-2026-0005 (procedural pattern observed, not the ordering itself tested as a unit) | — | Reorder only with recorded rationale; not yet validated as a sequence on a real project. |
| A semantic area may span responsibility clusters/files while semantic authority remains singular | REQUIRED v0.2 contract; outcome benefits EXPERIMENTAL | Derived architectural finding and accepted design decision | EV-SDE-2026-0006; DF-SDE-2026-0004 | TH-SDE-2026-0005; HY-SDE-2026-0007 | No controlled monolith/decomposition comparison; physical splitting can worsen navigation or duplicate rules. |
| Use a repository semantic map and feature manifests for deterministic local-first routing in nontrivial adopting projects | REQUIRED v0.2 execution contract; effectiveness EXPERIMENTAL | Accepted design decision; no outcome trial | EV-SDE-2026-0006; DF-SDE-2026-0004 | HY-SDE-2026-0008 | Manifest maintenance and staleness may offset benefit; small repositories may not need per-feature manifests. |
| Bounded reasoning scope reduces engineering cost or defects | RESEARCH ONLY | Open | EV-SDE-2026-0006 | TH-SDE-2026-0005; HY-SDE-2026-0007; HY-SDE-2026-0008 | No causal comparison; task, model, tool, familiarity, and verification differences may dominate. |
| Treat physical LOC as a configurable review signal, not semantic truth | RECOMMENDED review guidance | Derived architectural rationale | EV-SDE-2026-0006; DF-SDE-2026-0004 | HY-SDE-2026-0007 | Exact bands are provisional and language/generated-code sensitive; LOC cannot detect duplicate authority. |
| Context Surface, CER, and Discovery Expansion diagnose unexpected context growth | EXPERIMENTAL | Proposed, not validated | EV-SDE-2026-0006 | HY-SDE-2026-0007; HY-SDE-2026-0008 | Counting unit and denominator must be preregistered; cross-cutting changes legitimately expand. Never gate conformance on CER. |
| Serious experiments capture durable cumulative telemetry at T0–T6 and leave unavailable metrics missing | REQUIRED evidence practice | No-invention rule supported; checkpoint schedule adopted for prospective trials | EV-HN-2026-0005; EV-SDE-2026-0006; DF-SDE-2026-0004 | — | Environment may expose only a subset; checkpoints cannot retroactively repair missing historical telemetry. |

## How to use this map

1. Before writing a new SDE rule, find or add a row here first.
2. Distinguish a **constitutive contract** from an **empirical outcome
   claim**. An accepted Decision Record may define what v0.2 requires, but it
   does not make the contract's cost/correctness benefit supported. Label that
   outcome separately as EXPERIMENTAL or RESEARCH ONLY until evidence supports
   it. An empirical claim can only become REQUIRED/RECOMMENDED evidence-based
   guidance when its Evidence state is `Supported`, not `Open` or
   `Contradicted`.
3. A `Contradicted` row stays in this table permanently, cross-linked into
   `doctrine/CONTRADICTIONS-AND-DEPRECATED.md`, so a future agent cannot
   silently re-propose it without seeing why it was rejected.
4. When a follow-on experiment changes a row's evidence state, update this
   table and the underlying theory/hypothesis record together, in the same
   change, per `framework/protocols/SUPERSESSION.md`.
