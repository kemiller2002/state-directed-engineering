---
identifier: RP-SDE-2026-0002
title: Structural locality and deterministic navigation integration for SDE v0.2
research_area: state-directed-engineering
discipline: [software-engineering-methodology, software-architecture, agentic-engineering]
author_agent: OpenAI Codex (runtime model identifier not exposed)
version: 1.0.0
status: canonical
confidence:
  label: medium
  estimate: 0.50
  rationale: The integration preserves directly evidenced boundary and verification mechanisms, but structural-locality and manifest-effectiveness outcomes remain untested hypotheses.
completion:
  state: complete
  estimate: 1.0
priority: high
related_projects: [state-directed-engineering]
related_documents:
  - research/journals/JR-SDE-2026-0002--structural-locality-navigation-integration.md
  - research/evidence/EV-SDE-2026-0006--structural-locality-and-navigation-notes.md
  - research/hypotheses/HY-SDE-2026-0007--semantic-locality-bounds-context-and-risk.md
  - research/hypotheses/HY-SDE-2026-0008--semantic-maps-reduce-discovery-expansion.md
  - research/theories/TH-SDE-2026-0005--bounded-reasoning-scope.md
  - research/decisions/DF-SDE-2026-0004--adopt-sde-v0.2-context-and-structure.md
  - method/CONSTRUCTION-METHOD-v0.2.md
supersedes: []
superseded_by: []
tags: [sde-v0.2, structural-locality, navigation, context, distribution]
keywords: [responsibility-cluster, semantic-map, feature-manifest, context-surface, bounded-reasoning]
created: 2026-09-05
updated: 2026-09-05
---

# Research State Snapshot

- **Theory Version:** `TH-SDE-2026-0005` v1.0.0, candidate, Medium (0.50).
- **Knowledge Base Version:** SDE/method v0.2; distribution package v1.1.0.
- **Highest Confidence Areas:** explicit semantic authority, boundary
  contracts, compiler/architecture/contract feedback, and behavioral proof
  for semantic no-ops remain grounded in accepted HelixNote evidence.
- **Lowest Confidence Areas:** whether responsibility clusters, semantic
  maps, or feature manifests reduce cost, context, or defects.
- **Largest Remaining Unknown:** whether bounded reasoning scope improves an
  end-to-end engineering outcome on a non-HelixNote project.
- **Active Research Streams:** `HY-SDE-2026-0007`,
  `HY-SDE-2026-0008`, and the unexecuted first validation `WI-0019`.
- **Recently Invalidated Ideas:** none newly invalidated; exact LOC/CER gates
  and a claimed greenfield result were explicitly withheld for lack of
  evidence.
- **Priority Changes:** instrument the first real v0.2 use before adding more
  semantic automation.

# Executive Summary

This package records the review and integration of three committed research
notes into SDE v0.2. The notes contribute a useful missing layer: safe changes
depend not only on legal states, transitions, and boundaries, but also on the
discoverability and locality of the responsibility being changed. The adopted
method distinguishes semantic area, semantic authority, responsibility
cluster, and physical file; adds repository semantic maps and feature
manifests as navigation indexes; reconciles local-first discovery with
mechanical-first propagation; defines explicit context escalation; and adds
context/defect telemetry for future trials.

The integration does **not** claim that these mechanisms reduce cost or
defects. Those outcomes are preserved as Low-confidence hypotheses. Exact LOC
bands, Context Expansion Ratio, and Discovery Expansion are diagnostic only.
The only new automated structural check is a deterministic, configurable,
warning-only physical-line review (`SDE-STRUCT-001`).

# Original Objective

Review the supplied research notes, reconcile justified findings into the
State-Directed Engineering methodology, update architecture, verification,
agent guidance, templates, distribution, and repository state, preserve prior
evidence, and leave the repository valid and continuable.

## Success Criterion

A fresh agent can locate and apply SDE v0.2 without the source conversation;
can distinguish adopted contracts from unvalidated predicted benefits; can
navigate through an existing semantic map and optional feature manifests; can
run the distribution tests and structural review; and can identify remaining
research gaps and the next work item.

# Scope

## Included

- Full review of the three tracked files under `Notes/`.
- Reconciliation with canonical governance, doctrine, method, context,
  accepted evidence, templates, and distribution implementation.
- New evidence, hypothesis, theory, decision, journal, and REP records.
- SDE/method v0.2 and npm package v1.1.0 versioning.
- A warning-only portable structural source-line inspection.
- Repository context, risk, chronology, and handoff updates.

## Excluded

- Modification of the source notes or accepted HelixNote evidence.
- Retroactive reinterpretation of completed SDE v0.1 work.
- Execution or invention of a non-HelixNote/greenfield validation result.
- Language-aware semantic authority, responsibility-mixing, or dependency
  analysis not reliably implementable by the zero-dependency verifier.
- Refactoring `tools/ros_cli.mjs` solely because it crosses a line band.
- Publishing the npm package or modifying another repository.

## Scope Changes

No material expansion. The requested structural verification was narrowed to
the deterministic portion that can be implemented without false confidence;
the semantic findings remain documented manual checks.

# Repository Context

The work began at commit
`d1b8d8f39b9b3bdc6bbde842b29a1f5b16301e95` on branch
`claude/ros-bootstrap-init-ao9vu4`, with a clean user-content tree. SDE v0.1
and distribution v1.0.1 were authoritative. `WI-0019`, the first
non-HelixNote validation execution, was ready but unstarted. ROS work item
`WI-0026` governs this package.

The three note files were committed together at the starting commit. They
contain architectural analysis and proposed contracts but no attached
controlled structural/navigation experiment or authoritative runtime
telemetry.

# Current Understanding

Bounded reasoning scope is a coherent SDE design objective: state constraints
bound what may be true; transition/capability constraints bound what may
happen; boundary contracts bound how decisions travel; structural locality
routes responsibility; navigation artifacts make that responsibility
discoverable; verification maps failure classes to trustworthy mechanisms.

The mechanism-specific parts have accepted support, but the unified causal
claim does not. A good map or manifest is therefore an adopted low-cost
contract whose benefit should be measured, not a proven optimization. A large
file is evidence to review the responsibility boundary, not proof that the
boundary is wrong.

# Key Discoveries

- The notes' strongest contribution is a missing distinction between semantic
  authority and physical decomposition. One semantic area may span multiple
  responsibility clusters/files without acquiring multiple authorities
  [`EV-SDE-2026-0006`; `DF-SDE-2026-0004`].
- Local-first and mechanical-first rules apply at different phases. Declared
  local context finds the responsible authority; after the authoritative
  change, compiler/architecture/contract feedback should precede broad
  exploratory search [`EV-HN-2026-0005`; `EV-SDE-2026-0006`].
- Existing `context/ARCHITECTURE.md` already serves as this methodology
  repository's semantic map. Creating a second root map would introduce drift
  rather than improve routing [`DF-SDE-2026-0004`].
- The roadmap's claimed greenfield trial is not backed by an accepted `EX-` or
  `EV-` record and conflicts with current canonical state. No result or metric
  was promoted [`EV-SDE-2026-0006`].
- The initial verifier extension omitted `.mjs` and `.sh`, causing a false
  zero-finding result on this repository. Adding those default source types
  exposed `tools/ros_cli.mjs` at 1,085 lines in the strong-review band. The
  implementation now has regression coverage for those extensions.

# Evidence Registry

| ID | Claim/Observation | Source and Method | Supports/Contradicts | Quality and Limits |
|---|---|---|---|---|
| `EV-SDE-2026-0006` | Notes propose structural locality, deterministic navigation, and context metrics. | Full read of three Git-tracked notes plus provenance and accepted-evidence reconciliation. | Supports rationale for `HY-0007`, `HY-0008`, `TH-0005`; does not establish their outcomes. | Derived, Medium; no controlled trial or attached telemetry. |
| `EV-HN-2026-0001`–`0002` | Tier boundaries and explicit boundary authority provide the pre-existing architectural base. | Accepted HelixNote audit/investigation evidence. | Supports explicit ownership and contract routing. | Single application/language family. |
| `EV-HN-2026-0004`–`0005` | Mechanical checks can miss semantically inert arms; behavior must be observed. | Accepted controlled-experiment evidence. | Supports semantic no-op verification and bounded use of mechanical discovery. | Same application; Experiment 3 cost telemetry incomplete. |
| `SDE-STRUCT-001` implementation result | Physical LOC can be measured deterministically and reported without making it a semantic gate. | Distribution unit/integration tests and repository scan. | Supports feasibility of the limited verifier contract. | Measures physical lines only; no semantic inference. |

# Hypothesis Registry

| ID | Statement | Evidence For | Evidence Against | Unknowns | Confidence | Disposition | Implications |
|---|---|---|---|---|---|---|---|
| `HY-SDE-2026-0007` | Semantic locality lowers context acquisition and unrelated regression risk. | `EV-SDE-2026-0006` rationale. | Fragmentation and cross-cutting counterexamples considered. | Comparative context and defect outcomes. | Low, 0.35 | unresolved | Measure; do not assert savings. |
| `HY-SDE-2026-0008` | Maps/manifests lower discovery expansion without harming correctness. | `EV-SDE-2026-0006` rationale. | Staleness and omitted-dependency risks considered. | Paired same-task navigation outcome. | Low, 0.30 | unresolved | Adopt as routing contract; measure maintenance and discovery cost. |

# Failed Assumptions

- **The roadmap's greenfield-trial statement can be treated as accepted
  evidence.** Rejected: the repository has no supporting accepted experiment
  and explicitly records that the validation has not run.
- **Every semantic area should be one file.** Rejected: this would confuse
  authority with physical organization and can create fragmented coupling.
- **LOC or CER can serve as a universal quality gate.** Rejected: both are
  proxies whose causal relationship to correctness/cost is untested.
- **Adding a source scan automatically covers this repository.** Rejected
  during implementation: the first extension set missed its `.mjs` and `.sh`
  sources, prompting a repair and regression test.

# Open Questions

1. Do responsibility clusters reduce context and unrelated regressions for
   equivalent changes?
2. Do semantic maps/manifests reduce discovery effort enough to repay their
   maintenance cost?
3. How should Declared and Actual Context Surface be counted reproducibly?
4. Which language-aware sources can support semantic structural findings
   without producing misleading pass/fail signals?
5. Does SDE v0.2 improve an end-to-end outcome outside HelixNote?

# Recommended Next Research

Run the already designed first non-HelixNote validation as `WI-0019`, but
freeze the exact SDE method/package version used. Capture T0–T6 telemetry
before acting, distinguish declared and actual context, and report missing
token/cost fields as unavailable. If feasible, embed a paired manifest versus
no-manifest navigation comparison without changing the underlying feature
task.

# Research Backlog

- `WI-0019`: execute the first engineering validation trial; ready, not
  started.
- `WI-0027`: inspect `tools/ros_cli.mjs` responsibility boundaries; captured
  after the warning-only scan, low priority.
- Language-aware `SDE-STRUCT-002` through `004` analyzers remain unfiled
  research possibilities, not obligations, until a reliable input model is
  proposed.

# Suggested Specialized Research Agents

- A trial-design reviewer familiar with controlled software-engineering
  experiments can preregister the v0.2 treatment and context measures.
- A language-analysis specialist can evaluate whether compiler/build graphs
  expose responsibility and dependency data safely enough for future checks.

# Parallel Research Opportunities

The paired navigation trial, cross-language Four-Tier replication, and
`tools/ros_cli.mjs` structural review do not require the same implementation
state and can proceed independently once each has its own work item.

# Risks

- **Epistemic:** adopted contracts may be misreported as proven benefits.
- **Navigation:** stale manifests may hide required context.
- **Structural:** LOC warnings may encourage arbitrary splitting or gaming.
- **Verification:** warning-only checks may be ignored, while semantic checks
  may be falsely assumed automated.
- **Versioning:** a v0.1 trial cannot be silently reclassified as v0.2
  evidence.
- **Operational:** generated distribution output records a dirty source
  revision during local testing; releases must be built from the intended
  clean commit.

# Cross-Discipline Opportunities

Responsibility clusters and singular authority overlap with cohesion,
information hiding, domain-driven bounded contexts, and modularity research.
Future work may compare terminology and prior empirical evidence, but this
mission did not browse or introduce unverified external literature.

# Knowledge Relationships

`EV-SDE-2026-0006` motivates `HY-SDE-2026-0007` and `0008`; those hypotheses
feed candidate theory `TH-SDE-2026-0005`. Accepted decision
`DF-SDE-2026-0004` adopts the engineering contracts while explicitly bounding
the theory's confidence. `doctrine/EVIDENCE-TO-ENGINEERING-MAP.md` is the
canonical proposition-to-evidence view.

# Theory Impact Assessment

- **Affected Theory Records:** new `TH-SDE-2026-0005`, candidate Medium
  (0.50); existing accepted theories remain unchanged.
- **Affected Engineering Principles:** structural locality, navigation,
  context escalation, telemetry, semantic no-op verification, and
  construction optimization.
- **New Principle Candidates:** bounded reasoning scope as a unifying design
  objective; context surface as a measurable architecture property.
- **Deprecated Principles:** one-semantic-area-per-file, universal LOC proof,
  CER as a pass/fail gate, and manifests as semantic authority are rejected.
- **Confidence Changes:** no existing evidence/theory confidence was raised.
- **Predictions Created:** lower context expansion and unrelated regression
  under bounded locality; lower discovery expansion with current maps and
  manifests.
- **Predictions Invalidated:** none experimentally; an unsupported greenfield
  outcome claim was withheld rather than treated as falsified.
- **Required Theory Registry Updates:** add `TH-SDE-2026-0005` through the ROS
  registry build.

# Research Quality Metrics

| Metric | Result | Method / limitation |
|---|---|---|
| Source-note coverage | 3 of 3 files read in full | Direct file reads; paths and commit verified with Git. |
| Accepted prior evidence reviewed | 5 of 5 `EV-HN-2026-0001`–`0005` | Direct file reads. |
| Frozen artifacts changed | 0 | SHA-256 baseline and completion comparison. |
| New controlled experiments | 0 | This was synthesis plus implementation, not a comparative trial. |
| Distribution tests | 30 passed, 0 failed | `npm test`; includes build, CLI, safety, update, and structural review. |
| Structural scan | 25 source files; 1 warning | Default scanner; physical LOC only. |
| Package dry run | 2 passed after 1 environment failure | Default npm cache was not writable; isolated `/tmp` cache succeeded with 38 package files. |
| Markdown links | 39 changed-source and 17 built-package files, 0 missing targets | Deterministic local link check. |
| Input/output/cache tokens and cost | NOT OBSERVABLE | No authoritative usage/billing interface exposed. |

# Research Debt

## Missing Evidence

No controlled evidence for structural locality, maps/manifests, CER, or
Discovery Expansion outcomes.

## Missing Experiments

Paired centralized/decomposed and manifest/no-manifest trials; first
non-HelixNote end-to-end validation.

## Missing Disciplines

No external software-modularity or program-comprehension literature review was
performed.

## Weak Areas

The approximately 7,000-line Bolero observation is note-derived and was not
independently reproduced in this mission.

## Replication Needed

Every v0.2 causal outcome claim requires independent or controlled testing.

## Tool Limitations

The portable verifier can count physical lines but cannot infer semantic
authority, responsibility mixing, or undeclared runtime dependencies.

## Assumptions Awaiting Evidence

That Markdown navigation artifacts stay current, that their maintenance cost
is modest, and that explicit context bounds improve outcomes.

# Repository Updates

The mission adds/updates versioned doctrine, method, evidence records,
templates, repository context, and the distribution implementation. The
source notes, accepted HelixNote evidence, prior migration journal/REP, and
Construction Method v0.1 remain frozen. Generated registries are rebuilt only
after the research records are complete.

# Website Updates

Not applicable. This repository contains no in-scope website or site
publication surface.

# AI Consumption Notes

Read `context/ARCHITECTURE.md` as this repository's semantic map. For an
adopting repository, route from its map to a feature manifest when present;
then read local authority, contracts, tests, and declared dependencies.
Escalate explicitly when context is insufficient. Do not read research notes
as required routine execution context, do not infer that a manifest owns the
semantics it indexes, and do not treat LOC/CER as correctness gates.

# Handoff Instructions

1. Confirm `WI-0026` is complete and `WI-0019` remains unstarted.
2. For methodology work, begin with SDE v0.2 and `DF-SDE-2026-0004`; preserve
   v0.1 citations as historical.
3. For a consuming-project trial, freeze the exact method/package, requirement,
   repository state, measures, and stop conditions before T0.
4. Record unexpected context as evidence rather than silently widening scope.
5. Do not automate semantic structural findings until inputs and false-positive
   behavior are validated.

# Research Journal

Chronological actions, baseline checksums, telemetry checkpoints, repair
loops, and validation results are in
`research/journals/JR-SDE-2026-0002--structural-locality-navigation-integration.md`.

# Appendix

Primary sources: the three files under `Notes/` at commit `d1b8d8f`. The
checksum-list file used during the mission hashes to
`7548dcac11692912f8eb5086501eedf330911d39771465b8ac7d8f73357f86ec`.

# Completion Checklist

- [x] Metadata and Research State Snapshot are present.
- [x] Mandatory REP sections exist.
- [x] Claims trace to evidence/hypotheses/theory/decision records.
- [x] Contradictions, rejected assumptions, and missing evidence are explicit.
- [x] Theory impact and research debt are explicit.
- [x] Quality metrics include methods and limitations.
- [x] Registry, repository, link, test, and ROS validation are complete before
  the final ROS work transition; post-transition validation is required by the
  work protocol.
- [x] Final handoff and journal carry exact completion results and explicit
  telemetry limitations.
