---
id: EV-SDE-2026-0006
title: Structural locality, agent navigation, and SDE v0.2 proposal notes
research_area: state-directed-engineering
evidence_type: derived
status: accepted
type: evidence
source_title: Committed SDE structural-locality, navigation, and roadmap notes
source_author: Kevin Miller (Git author; individual passage authorship not separately recorded)
source_repository: kemiller2002/state-directed-engineering
source_branch: claude/ros-bootstrap-init-ao9vu4
source_commit: d1b8d8f39b9b3bdc6bbde842b29a1f5b16301e95
source_paths:
  - Notes/agent-navigation-context-discovery-contract.txt
  - Notes/state-system-structural-locality-contract.txt
  - Notes/roadmap-to-review.md
source_date: 2026-09-05
retrieved: 2026-09-05
created_by_agent: OpenAI Codex (runtime model identifier not exposed)
confidence: medium
supports: [HY-SDE-2026-0007, HY-SDE-2026-0008, TH-SDE-2026-0005]
contradicts: []
related_theories: [TH-SDE-2026-0003, TH-SDE-2026-0004, TH-SDE-2026-0005]
created: 2026-09-05
updated: 2026-09-05
tags: [structural-locality, navigation, context-surface, sde-v0.2, notes]
---

# EV-SDE-2026-0006 — Structural locality and navigation notes

## Evidence summary

Three committed notes propose a coherent extension to SDE: constrain not only
legal state and action, but also the structural and discovery context required
to change them safely. They distinguish semantic authority from physical file
organization, propose responsibility clusters, define local-first navigation
through repository maps and feature manifests, propose Context Surface and
context-expansion diagnostics, and synthesize related method changes from the
existing HelixNote experiment sequence.

This is **derived evidence and proposed architecture**, not a newly executed
controlled experiment. Its strongest claims are those that can also be traced
to previously accepted `EV-HN-2026-0001` through `EV-HN-2026-0005`.

## Exact claims supported or bounded

### Corroborated by accepted prior evidence

- Mechanical feedback should be used before broad exploratory search when a
  known semantic authority and relevant mechanisms exist
  [`EV-HN-2026-0005`; `TH-SDE-2026-0003`].
- Mechanical discovery and construction optimization are distinct; the
  approximately four boundary files per semantic decision observed in the
  HelixNote trials remains evidence, not a universal constant
  [`EV-HN-2026-0003` through `0005`; `TH-SDE-2026-0004`].
- Present-but-wrong or semantically inert branches can pass compiler,
  architecture, and contract checks and therefore require behavioral evidence
  [`EV-HN-2026-0004`, `EV-HN-2026-0005`].
- Wire contracts require deliberate authority and validated re-entry
  [`EV-HN-2026-0002`].

### Supported as engineering rationale, not established empirical law

- A semantic area may span multiple files; physical decomposition should
  follow responsibility clusters without duplicating semantic authority.
- Context size and discoverability are architectural concerns for human and
  agent maintenance.
- Repository semantic maps, feature manifests, local tests, and explicit
  dependency boundaries provide a deterministic routing mechanism that is
  preferable to requiring routine tasks to reconstruct repository structure
  from global search.
- Presentation-state architectures such as Elmish/MVU/Redux are subject to
  the same locality and authority rules as other state systems.
- Physical source line count is useful as a configurable review signal but is
  insufficient to prove semantic locality or nonconformance by itself.

### Experimental predictions only

- Semantic decomposition reduces AI context acquisition, engineering cost, or
  regression risk compared with an equivalent centralized implementation.
- Feature manifests reduce searches, tokens before first edit, Discovery
  Expansion, or Context Expansion Ratio.
- CER near 1 predicts lower maintenance cost or higher correctness.
- Exact LOC thresholds or an aggregate Structural Concentration Score predict
  defects across languages and repositories.

## Source provenance

Git commit `d1b8d8f` (`add notes`) adds all three source documents. Git records
the directory as `Notes/`. The commit author and committer are Kevin Miller;
the notes contain no independent per-document authorship, experimental
protocol, frozen baseline identifier, or telemetry attachment.

The sources are preserved byte-for-byte. Their pre-integration SHA-256 values
were recorded contemporaneously in the mission journal
[`JR-SDE-2026-0002`].

## Relevant observations

- The structural-locality note reports an approximately 7,000-line Bolero
  Elmish client concentrating `Model`, `Msg`, `update`, rendering, routing,
  and interaction behavior, and records that expansion stopped rather than
  risk an unverifiable rewrite.
- The navigation note proposes the path Task → Repository Map → Feature →
  Manifest → Local semantics/tests → Declared dependencies → Modification →
  Verification and an explicit escalation contract.
- The roadmap distinguishes strong existing findings, engineering guidance to
  measure, and experimental/non-doctrinal proposals; it proposes SDE v0.2.
- The roadmap also refers to a greenfield engineering trial whose underlying
  accepted experiment record is not present in this repository.

## Interpretation

The notes justify a versioned SDE methodology expansion when their claims are
assigned evidence-appropriate strength. They do not justify treating exact
file thresholds, CER, manifest effectiveness, semantic-duplication detection,
code generation, or cost reduction as universal pass/fail doctrine.

The most coherent integration is to make structural and navigational
contracts explicit engineering rules while keeping outcome claims under
active hypotheses. A deterministic physical LOC warning can be implemented
without pretending to measure semantic structure; the other proposed
structural/navigation findings remain manual review or future-tooling work.

## Limitations and counterevidence

- No controlled monolith-versus-decomposition trial is attached.
- No manifest-versus-no-manifest navigation trial is attached.
- No Context Surface, CER, or Discovery Expansion measurements are attached.
- The Bolero line count and stop decision were not independently reproduced
  during this mission; they remain an architectural observation from the
  committed notes.
- The claimed greenfield trial is not represented by an accepted `EX-` or
  `EV-` record here and conflicts with current canonical repository state,
  which says the first non-HelixNote validation has not run. No results from
  that purported trial are promoted.
- The exact thresholds are provisional judgment bands, not validated
  cross-language defect predictors.

## Reproduction or verification notes

The three source files were read in full. Their commit provenance and tracked
paths were checked with Git. Every accepted HelixNote evidence record
`EV-HN-2026-0001` through `0005` was read before classifying the note claims.
Frozen-source checksums will be compared again before completion.

