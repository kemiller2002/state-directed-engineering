---
identifier: RP-SDE-2026-0001
title: State Programming research consolidation and State-Directed Engineering v0.1 bootstrap
research_area: state-directed-engineering
discipline: [software-engineering-methodology, programming-language-theory]
author_agent: claude-sonnet-5 (Claude Code)
version: 1.0.0
status: canonical
confidence:
  label: medium
  estimate: 0.60
  rationale: Strong, replicated evidence for several specific claims (BCA=4.0 x3, present-but-inert-arm miss x2); genuinely open questions remain (token/cost reduction, method-as-a-whole validation) and are preserved as open, not resolved by this REP.
completion:
  state: complete
  estimate: 1.0
priority: high
related_projects: [state-directed-engineering, helix-note-application]
related_documents:
  - doctrine/STATE-PROGRAMMING.md
  - doctrine/STATE-DIRECTED-ENGINEERING.md
  - doctrine/FOUR-TIER-ARCHITECTURE.md
  - doctrine/BOUNDARY-PRESERVATION.md
  - doctrine/EVIDENCE-TO-ENGINEERING-MAP.md
  - doctrine/CONTRADICTIONS-AND-DEPRECATED.md
  - method/CONSTRUCTION-METHOD-v0.1.md
  - research/migration/STATE-PROGRAMMING-TO-SDE-MIGRATION-MANIFEST.md
supersedes: []
superseded_by: []
tags: [migration, state-programming, sde, bootstrap]
keywords: [four-tier, boundary-preservation, mechanical-discovery-rate, boundary-change-amplification, agent-cost]
created: 2026-09-02
updated: 2026-09-02
---

# Research State Snapshot

- **Theory Version:** TH-SDE-2026-0001 through TH-SDE-2026-0004, v1.0 (first
  formalization in SDE; grounded in HelixNote's own three-experiment
  sequence).
- **Knowledge Base Version:** SDE v0.1 (this bootstrap).
- **Highest Confidence Areas:** Boundary Change Amplification = 4.0,
  replicated identically three times across two architectures
  (TH-SDE-2026-0004); the present-but-inert fan-out arm evading every
  mechanical check, replicated twice (HY-SDE-2026-0005).
- **Lowest Confidence Areas:** whether any specific ordering of the
  Construction Method's steps, taken as a whole, reduces real engineering
  cost — not yet tested as a unit, only assembled from individually
  evidenced transitions.
- **Largest Remaining Unknown:** Condition B's true total agent cost in
  Experiment 3 (tool calls/tokens/wall-clock) — genuinely unknown because
  its telemetry covers only a resumed partial run following an
  interruption, not merely unmeasured.
- **Active Research Streams:** none opened by this REP beyond the ROS
  backlog items listed in "Recommended Next Research."
- **Recently Invalidated Ideas:** "higher MDR means lower cost" and
  "boundary hardening reduces boundary-file count" — both directly
  contradicted; see `doctrine/CONTRADICTIONS-AND-DEPRECATED.md`.
- **Priority Changes:** the first engineering validation
  (`method/FIRST-VALIDATION-DESIGN.md`) is now the highest-priority
  follow-on research item, ahead of any further HelixNote experimentation,
  because SDE's Construction Method has not yet been tested on a
  non-HelixNote project.

# Executive Summary

This REP is the migration record for consolidating HelixNote's State
Programming research (Four-Tier architectural layering, Boundary
Preservation, and Controlled Experiments 1-3) into the
`state-directed-engineering` repository as State-Directed Engineering (SDE)
v0.1 doctrine, method, and evidence. The central decision-relevant result:
SDE's core engineering claims are a **mix of well-replicated findings**
(Boundary Change Amplification fixed at 4.0 across three trials; a
present-but-inert boundary arm evading every mechanical check tried, twice)
and **genuinely open or contradicted questions** (whether hardening reduces
AI-agent token/wall-clock cost — open, due to incomplete telemetry; whether
higher Mechanical Discovery Rate means lower engineering cost — directly
contradicted). The largest caveat: nothing in this body of evidence has
been tested on an application other than HelixNote, or as a complete,
end-to-end method rather than as individually evidenced transitions.

# Original Objective

Establish `state-directed-engineering` as the durable, canonical home of
the State-Directed Engineering methodology, while preserving HelixNote as
the original experimental evidence source, producing a traceable bridge
from scientific research to engineering practice. Success criterion (from
the migration mission): a fresh agent, with no conversational memory, can
answer — from the repository alone — what State Programming and SDE are,
what evidence led to the methodology, which ideas were contradicted, the
Four Tiers, the Boundary Preservation rules, the current construction
workflow, rule confidence classes, how to classify a change, verification
ordering, what metrics to collect, where the original evidence lives, what
remains scientifically unresolved, and what comes next.

# Scope

## Included

- Inventory and classification of HelixNote's State Programming research
  reachable from `main` and all fetched experiment branches.
- Evidence, hypothesis, theory, and decision records for the Four-Tier
  layering, Boundary Preservation, and Experiments 1-3 (using the corrected
  Experiment 3 commit `8ac05fd` as authoritative).
- SDE doctrine and method v0.1 documents.
- ROS work items for this migration and named follow-on work.

## Excluded

- Any HelixNote repository modification (HelixNote was treated as
  read-only throughout).
- Solving the 4.0 Boundary Change Amplification finding (`DF-SDE-2026-0003`).
- Executing the first engineering validation (`method/FIRST-VALIDATION-DESIGN.md`
  is a design, not an execution).
- HelixNote's Clarity-website/patient-caregiver product research (a
  separate, unrelated HelixNote workstream).

## Scope changes

None during execution — the transition artifact referenced by the mission
could not be located (see Open Questions); this did not require a scope
change because the mission itself names the corrected Experiment 3 commit
as the fallback authority.

# Repository Context

`state-directed-engineering` began this migration as a single-commit
greenfield ROS 1.2.1-main.16.1 install (commit `0378571`) with generic
placeholder charter/context content unrelated to SDE. `helix-note-application`
is at `main` commit `211462a`, with the relevant State Programming research
split across `main` (Four-Tier audit, pilot report) and five experiment
branches not merged into `main` (boundary investigation, Experiments 1-3,
and both Experiment 3 condition branches). No prior REP existed in either
repository for this research area.

# Current Understanding

See `doctrine/STATE-PROGRAMMING.md`, `doctrine/FOUR-TIER-ARCHITECTURE.md`,
and `doctrine/BOUNDARY-PRESERVATION.md` for the full synthesized model.
Summary: a Four-Tier architectural layering (Semantic Model / Transition /
Orchestration / Host) with strict downward-only dependencies can isolate a
"what can be true" core from infrastructure concerns, verified mechanically
via an architecture check that passed in every trial across three
experiments. Boundary Preservation governs what happens to semantic
information crossing those tiers, distinguishing representation collapse
from uncoordinated duplication as compounding-but-distinct failure classes.
Mechanical discovery (compiler exhaustiveness, architecture checks, contract
tests) measurably improves — Experiment 2 raised strict MDR from 66.7% to
100% — without reducing total required boundary-propagation volume (BCA
held at 4.0 across all three experiments) and without closing a specific
present-but-inert-arm defect class, which two independent trials found
undetected by every mechanical check tried.

# Key Discoveries

- Boundary Change Amplification = 4.0, replicated identically three times,
  two architectures, three independent `ObservedValue` cases
  [EV-HN-2026-0003, EV-HN-2026-0004, EV-HN-2026-0005; TH-SDE-2026-0004].
- A structurally-present, semantically-inert fan-out arm evades every
  mechanical check tried (compiler, architecture check, schema-agreement
  test, field-vocabulary-agreement test) identically across two
  experiments and three trial conditions; caught only by integration
  testing / direct data inspection [EV-HN-2026-0004, EV-HN-2026-0005;
  HY-SDE-2026-0005].
- Mechanical Discovery Rate and agent search/repair-loop cost can move in
  **opposite** directions in the same trial — MDR is not a valid proxy for
  engineering cost on its own [EV-HN-2026-0005; TH-SDE-2026-0003].
- HelixNote's own "Four-Tier State-System Model" is a same-named but
  conceptually distinct state-category taxonomy from SDE's architectural
  Four-Tier doctrine — a disambiguation not previously stated in either
  repository, discovered and recorded during this migration
  [EV-HN-2026-0001].
- Experiment 3's harness-level telemetry surfaced a genuine agent-cost
  reduction signal (63% fewer search operations, 50% fewer repair loops)
  alongside a genuinely incomplete, non-comparable telemetry figure for
  total token/tool-call/wall-clock cost (Condition B's resumed-portion-only
  data) [EV-HN-2026-0005].

# Evidence Registry

See `research/evidence/EV-HN-2026-0001` through `EV-HN-2026-0005` for full
records (source repository, branch, commit, path, method, direct
observations, supported/contradicted claims, quality and limitations for
each). Not restated here in full to avoid a lossy duplicate — this section
is a synthesis, not a copy, per `framework/REP-SPECIFICATION.md`'s own
guidance that a REP references the underlying record rather than copying it
wholesale.

# Hypothesis Registry

See `research/hypotheses/HY-SDE-2026-0001` and `HY-SDE-2026-0002` (covering
H3.1 through H3.6). Dispositions, in brief: H3.1 partially supported, H3.2
supported, H3.3 contradicted (for the present-but-inert shape), H3.4
contradicted, H3.5 contradicted, H3.6 mixed/partially supported.

# Failed Assumptions

- "Boundary hardening reduces how much boundary work a change requires" —
  invalidated by three replications of BCA=4.0. Impact: SDE doctrine
  explicitly states hardening changes *discovery*, not *volume*
  (`doctrine/EVIDENCE-TO-ENGINEERING-MAP.md`).
- "A higher Mechanical Discovery Rate means an architecture is working
  better for the executing agent" — invalidated directly by Experiment 3's
  own as-experienced vs. architecture-potential MDR split. Impact:
  `method/AGENT-EXECUTION-RULES.md` exists specifically because MDR alone
  is not a sufficient signal.
- "A single unifying 'Semantic Boundary Collapse' mechanism explains all
  boundary failures" — invalidated by Failure B in the boundary
  investigation. Impact: doctrine preserves two distinct failure classes
  instead of one umbrella term.

# Open Questions

1. **(Highest priority)** Does the SDE Construction Method, followed as a
   complete ordered workflow rather than as individually evidenced
   transitions, actually reduce real engineering cost on a project other
   than HelixNote? See `method/FIRST-VALIDATION-DESIGN.md` (not executed).
2. Does mechanical boundary hardening reduce AI-agent token/wall-clock cost?
   Open — Experiment 3's Condition B telemetry is a documented lower bound,
   not a total.
3. What mechanism, if any, would close the present-but-inert fan-out arm
   defect class short of integration testing? Not attempted in this
   research program.
4. Is the Four-Tier / Boundary Preservation model useful outside F#/.NET?
   Not tested; `doctrine/STATE-PROGRAMMING.md`'s "Language Neutrality"
   section states the intended generality as doctrine, not as tested fact.
5. Where was the referenced transition artifact
   (`STATE-PROGRAMMING-EXPERIMENT-3-TO-ENGINEERING-TRANSITION_2026-09-01_2019_EDT.txt`)
   actually produced, and does it contain any claim not already present in
   commit `8ac05fd`? Unknown — not located.

# Recommended Next Research

Priority order: (1) execute the first engineering validation design on a
non-HelixNote project — the largest current gap in SDE's evidence base;
(2) a same-mutation, same-architecture trial with investigation strategy
deliberately controlled (Experiment 3's own §35 recommendation), to isolate
how much of the as-experienced MDR gap is strategy vs. architecture;
(3) a dedicated API/HTTP-tier hardening experiment (BS3-01's sketch),
re-running Experiment 3's mission to see whether closing that gap changes
the as-experienced result.

# Research Backlog

Individual full REPs for Experiments 1, 2, and 3 (beyond the evidence
records this migration produced) — deferred per the artifact-threshold
guidance; open a dedicated ROS work item if a future maintainer judges the
evidence records insufficient for a specific downstream need. See
`research/migration/STATE-PROGRAMMING-TO-SDE-MIGRATION-MANIFEST.md`'s Gaps
section.

# Suggested Specialized Research Agents

- **Boundary-hardening design agent**: skills in F#/type-driven design and
  the target host language; scope: design and build a mechanism for the
  API/HTTP tier gap (BS3-01); inputs: `EV-HN-2026-0005`,
  `doctrine/BOUNDARY-PRESERVATION.md`; outputs: a new EX-/EV- record.
- **Cross-language replication agent**: skill in a non-F# language with
  sum-type support (Rust, Kotlin, Swift, Java); scope: replicate Experiment
  1's mutation shape in a different language/architecture; outputs: a new
  EV- record testing `doctrine/STATE-PROGRAMMING.md`'s Language Neutrality
  claim.

# Parallel Research Opportunities

The API/HTTP-tier hardening experiment and the cross-language replication
are independent of each other and of the first engineering validation —
none shares a starting branch or blocks the others.

# Risks

- **Epistemic:** treating any RECOMMENDED/EXPERIMENTAL row in
  `doctrine/EVIDENCE-TO-ENGINEERING-MAP.md` as REQUIRED without new
  evidence would silently overstate this research program's actual
  confidence.
- **Operational:** the experiment branches this migration cites
  (`experiment/boundary-authority-v1`, etc.) are unmerged and could be
  deleted by HelixNote maintainers, breaking this migration's citations —
  flagged in the migration manifest, not fixed (HelixNote is read-only for
  this mission).
- **Adoption:** presenting SDE's Construction Method to an engineering
  agent before the first validation runs risks the method being followed
  as if already proven; doctrine explicitly labels it "Provisional /
  Engineering Validation" to mitigate this.

# Cross-Discipline Opportunities

Boundary Preservation's Three-Contract Model parallels hexagonal/ports-and-
adapters architecture and Domain-Driven Design's anti-corruption layer
concept; a future doctrine revision could usefully cite that literature
directly rather than re-deriving the same shape from HelixNote alone — not
done in this migration to avoid inventing an external citation the
migration did not itself verify.

# Knowledge Relationships

See `doctrine/EVIDENCE-TO-ENGINEERING-MAP.md` for the full
proposition-to-evidence-to-theory linkage table; that table is this REP's
knowledge-relationship view and is not duplicated here.

# Theory Impact Assessment

- **Affected Theory Records:** TH-SDE-2026-0001 (Four-Tier Architecture),
  TH-SDE-2026-0002 (Boundary Preservation), TH-SDE-2026-0003 (MDR ≠
  engineering cost), TH-SDE-2026-0004 (detection vs. construction
  optimization) — all newly created by this REP, all `supported`.
- **Affected Engineering Principles:** all rows of
  `doctrine/EVIDENCE-TO-ENGINEERING-MAP.md`.
- **New Principle Candidates:** "compile before broad search" as
  RECOMMENDED (not yet REQUIRED) pending the controlled-strategy follow-up
  experiment.
- **Deprecated Principles:** see `doctrine/CONTRADICTIONS-AND-DEPRECATED.md`
  in full — five entries.
- **Confidence Changes:** N/A (first formalization; no prior SDE theory
  version existed to compare against).
- **Predictions Created:** the first engineering validation should show
  measurably lower search/rework than an unconstrained baseline if the
  Construction Method's core claims hold; if it does not, at least one
  RECOMMENDED-class row in the evidence map should be revisited.
- **Predictions Invalidated:** none yet (no prior SDE predictions existed).
- **Required Theory Registry Updates:** none pending — `./ros registry
  build` run and current as of this REP's acceptance (see Repository
  Updates).

# Research Quality Metrics

| Metric | Value | Method/Limit |
|---|---|---|
| Primary Sources | 7 (HelixNote committed documents read directly via `git show` at named commits) | Direct read, not secondary summary |
| Independent Sources | 3 experiments + 1 investigation + 1 audit, each an independently committed HelixNote artifact | Not independently replicated outside HelixNote |
| Counterexamples Reviewed | 1 (Failure B in the boundary investigation, which broke the single-mechanism hypothesis) | As reported in the source document |
| Competing Viewpoints Reviewed | as-experienced vs. architecture-potential MDR (Experiment 3's own reconciliation) | Both variants preserved, neither discarded |
| Hypotheses Tested | 6 (H3.1-H3.6, this migration's HY-SDE-2026-0001/0002) | Carried forward from Experiment 3, not newly tested by this migration |
| Failed Hypotheses | 3 (H3.3, H3.4, H3.5) | Contradicted per source report |
| Research Completeness | Migration-scope complete; methodology-validation-scope incomplete (no non-HelixNote trial yet) | Denominator: mission's own Definition of Done checklist |
| Confidence Gain | N/A — first formalization | No prior SDE confidence baseline existed |
| Open Questions Reduced | 0 net (this migration organizes and preserves open questions; it does not resolve any) | By design — resolving them was explicitly out of scope |

# Research Debt

## Missing Evidence
API/HTTP-tier boundary hardening has no evidence at all (BS3-01 is a sketch,
not a built mechanism).

## Missing Experiments
A strategy-controlled replication of Experiment 3; a non-F# language
replication of Experiment 1's mutation shape.

## Missing Disciplines
No human-factors/HCI review of whether SDE's Construction Method is usable
by a human engineer, as opposed to an AI agent — all evidence to date comes
from AI-agent trials.

## Weak Areas
The Construction Method's fixed step ordering, taken as a whole, is
EXPERIMENTAL and untested as a unit.

## Replication Needed
Every finding in this REP rests on HelixNote alone; none has an
independent-repository replication yet.

## Tool Limitations
Neither this migration nor the underlying experiments had access to
authoritative per-agent token/cost telemetry from inside the agent's own
session — only harness-level data, itself sometimes partial.

## Assumptions Awaiting Evidence
The Language Neutrality doctrine claim (`doctrine/STATE-PROGRAMMING.md`) is
asserted from a small, targeted cross-language experiment
(`EV-HN-2026-0002`'s BP-001/BP-003), not a comprehensive language survey.

# Repository Updates

Created: `doctrine/*.md` (7 files), `method/*.md` (6 files),
`templates/sde/*.md` (3 files), `research/evidence/EV-HN-2026-0001..0005`,
`research/hypotheses/HY-SDE-2026-0001..0002`,
`research/theories/TH-SDE-2026-0001..0004`,
`research/decisions/DF-SDE-2026-0001..0003`,
`research/journals/JR-SDE-2026-0001`, this REP
(`research/packages/RP-SDE-2026-0001`),
`research/migration/STATE-PROGRAMMING-TO-SDE-MIGRATION-MANIFEST.md`,
`research/CHRONOLOGY.md`. Updated: `PROJECT-CHARTER.md`, `context/*.md`
(see the completion report for the exact diff summary).
`./ros registry build` run after acceptance; registries current per
`./ros registry check`.

# Website Updates

Not applicable — this repository has no generated website/publication
target configured in `ros.json`'s `generated` root at the time of this
migration.

# AI Consumption Notes

Reliable facts an agent may cite directly: the exact figures in
`EV-HN-2026-0003/0004/0005` (they are reproduced verbatim from primary
sources, not estimated). Caveats an agent must always carry forward: the
Condition B telemetry incompleteness (never state a confirmed token/cost
reduction from Experiment 3); the Four-Tier naming collision (never merge
HelixNote's state-category "four tiers" with SDE's architectural Four
Tiers). Retrieval terms: "Boundary Change Amplification", "Mechanical
Discovery Rate", "present-but-inert fan-out arm", "Four-Tier Architecture
disambiguation". Misuse risk: citing Experiment 3's raw harness-telemetry
percentage reductions (59%/68%/59%) without the incompleteness caveat would
misrepresent this research program's own stated findings.

# Handoff Instructions

A successor continuing SDE work should: read
`doctrine/STATE-DIRECTED-ENGINEERING.md` first, then
`doctrine/EVIDENCE-TO-ENGINEERING-MAP.md` to see what is and is not settled,
then `./ros work list` to see open work items (WI-0018, the first
engineering validation, is the highest-priority open item as of this REP's
acceptance). No prerequisite setup beyond a normal ROS checkout is required;
`./ros status` and `./ros validate` should both pass.

# Research Journal

See `research/journals/JR-SDE-2026-0001--sde-bootstrap-migration-journal.md`
for the full chronological record of this migration's 20 steps. This
section is a pointer, not a lossy re-summary.

# Appendix

None.

# Completion Checklist

- [x] Metadata is complete and internally consistent.
- [x] Research State Snapshot is complete.
- [x] All mandatory sections exist; non-applicable sections explain why.
- [x] Important claims trace to evidence and relevant hypotheses/theories.
- [x] Contradictory evidence and failed assumptions are preserved
      (`doctrine/CONTRADICTIONS-AND-DEPRECATED.md`, "Failed Assumptions"
      above).
- [x] Theory impact and required registry changes are explicit.
- [x] Quality metrics state their method or limitation.
- [x] Research debt is prioritized.
- [x] Partial/abandoned status, if used, has recovery instructions — not
      used; this REP is `complete`.
- [x] Repository and website updates are accurate.
- [x] Handoff permits continuation without conversation history.
- [x] Links, identifiers, and supersession relationships validate (see
      `./ros validate` output in the migration audit).
- [x] Another capable agent can satisfy the REP success criterion — see the
      final completion report's explicit answers to the mission's
      Definition of Done questions.
