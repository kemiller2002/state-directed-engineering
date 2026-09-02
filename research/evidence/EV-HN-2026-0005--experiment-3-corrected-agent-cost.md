---
id: EV-HN-2026-0005
title: HelixNote Controlled Experiment 3 (CORRECTED) — agent reasoning cost under mechanical boundary hardening
status: accepted
type: evidence
source_repository: kemiller2002/helix-note-application
source_branch: experiment/agent-cost-comparison-v3
source_commit: 8ac05fd25252fe9c8b43c4864978e31ca7b16bc1
source_paths:
  - docs/state-system/experiment-3-report.md
  - docs/state-system/experiment-3-results.json
  - docs/state-system/experiment-3-comparison.json
  - docs/state-system/experiment-3-mission.md
  - docs/state-system/experiment-3-predictions.md
  - docs/state-system/experiment-3-metrics-schema.json
collection_date: 2026-09-02
method: direct repository read of the committed, corrected experiment report via git show at commit 8ac05fd (the authoritative, corrected state per this migration's explicit mandate)
observation_type: direct-observation, including harness-level telemetry captured by the orchestrating session's own tool-spawn infrastructure (distinct evidence class from either agent's self-report)
completion_date_observed: 2026-09-02 00:25:50 UTC (commit timestamp of the correction itself; original draft report committed 2026-09-01 as commit 39bfa64, now SUPERSEDED by this record per the corrections below)
created: 2026-09-02
updated: 2026-09-02
tags: [experiment-3, mdr, bca, agent-cost, mechanical-discovery, helixnote, migration, authoritative]
related_evidence: [EV-HN-2026-0002, EV-HN-2026-0003, EV-HN-2026-0004]
supersedes_within_source_repo: commit 39bfa64's uncorrected report (not an SDE artifact; a HelixNote-internal correction, preserved in HelixNote's own git history, not rewritten)
---

# Evidence: HelixNote Controlled Experiment 3 (corrected, commit 8ac05fd)

**This is the authoritative Experiment 3 record for SDE.** Per this
migration's explicit mandate, wherever an earlier HelixNote summary of
Experiment 3 (including the never-located
`STATE-PROGRAMMING-EXPERIMENT-3-TO-ENGINEERING-TRANSITION_2026-09-01_2019_EDT.txt`
transition artifact referenced by the migration mission but not found in
either repository's git history on any branch — see the migration manifest's
gap log) states figures that differ from this record, **this record wins.**

## Design

Paired A/B controlled trial. Condition A (baseline architecture, from
Experiment 1's tag) and Condition B (hardened architecture, from Experiment
2's tag) each independently implemented the identical, frozen mission ("add
imaging finding tracking, end to end" — `ImagingFindingObserved`), each
executed by a **freshly spawned, isolated subagent** with no access to the
other condition's work or this research program's own prior reports. Both
conditions independently re-verified by the orchestrating session against
actual committed diffs, not accepted on self-report alone.

## Corrected headline figures (superseding any earlier draft)

| Metric | Condition A (baseline) | Condition B (hardened) |
|---|---|---|
| Required Change Sites (normalized) | 19 | 19 |
| MDR (as-experienced, each agent's own strict self-classification) | **42.1%** | **31.6%** |
| MDR (architecture-potential, crediting genuinely-guarded sites found by reading rather than compiling) | 42.1% | **52.6%** |
| MaDR (as-experienced) | 57.9% | 68.4% |
| MaDR (architecture-potential) | 57.9% | 47.4% |
| Files inspected (unique) | 27 | ~30 |
| Search operations | 38 | 14 (**-63%**) |
| Repair loops | 2 | 1 (**-50%**) |
| Boundary Change Amplification | 4.0 | 4.0 (third independent replication, exact match to Experiments 1 and 2) |
| Semantic no-op detected by | integration tests only | integration tests only (identical outcome in both) |

## Corrected log/step-count figures (§39.2)

Condition A's log has **76** numbered entries, not the "167" an earlier
draft of this same report stated — corrected by direct count
(`grep -cE "^[0-9]+\. "`). Condition B's log has 36 entries (unchanged, was
always accurate). The true step-count ratio is **~2.1x**, not ~4.6x.

## Harness-level telemetry (§39.1) — a distinct evidence class from self-report

Recorded by the orchestrating session's own tool-spawn infrastructure, not by
either agent (both agents correctly and honestly reported their own
token/cost metrics as "unavailable" — neither had introspection access to
its own usage):

| | Condition A (single, uninterrupted run) | Condition B (**resumed portion only**) |
|---|---|---|
| Tool uses (harness-counted) | 195 | 79 |
| Tokens (harness-counted) | 516,665 | 165,288 |
| Wall-clock duration | 2,185,962 ms (36.43 min) | 900,713 ms (15.01 min) |

**Critical caveat, load-bearing, must never be dropped in any downstream
summary:** Condition B was interrupted mid-trial by an infrastructure rate
limit and resumed as a separate tool invocation with preserved context. The
figures above for Condition B cover **only the resumed invocation**. The
resumed run picked up from roughly log entry 28 of the eventual 36 — i.e.,
**~78% of the eventual log already existed** when the counted portion began.
Condition B's true total tool-use/token/wall-clock cost is **UNKNOWN** and
could plausibly match or exceed Condition A's. **The raw reduction
percentages implied by this table (59% fewer tool uses, 68% fewer tokens,
59% less wall-clock) MUST NOT be read as a valid, confirmed cost reduction.**
They are a lower bound on Condition B's resumed-plus-original cost, not its
total.

## Confirmed confounders (§30, §39.3, §39.4)

- **Bolero build time.** Condition A's own log records ~6.5 minutes per
  `web-bolero` client build, with 3 such builds (~19-21 minutes of its own
  36.43-minute total). Condition B never built the Bolero client beyond its
  required verification pass — a consequence of legitimate mutation-
  equivalence asymmetry between the two starting branches, not of anything
  related to boundary hardening.
- **Cache/build warmth.** Condition A ran first in the shared container;
  Condition B ran second, sharing the same filesystem, NuGet cache, and
  MSBuild/restore artifacts — a real, plausible, unquantified contributor to
  Condition B's shorter wall-clock, independent of architecture or strategy.
- **Investigation-strategy divergence.** Condition A worked in a tighter
  edit-then-compile loop; Condition B invested more upfront reading before
  editing — the primary reason the two conditions' raw MDR figures are not
  directly comparable.
- **Self-classification-strictness divergence.** Condition A credited the
  compiler as "MECHANICAL" for two sites its own log shows it had also
  already found by reading beforehand; Condition B applied a stricter,
  temporal-precedence-only standard. Even Condition A's own MDR should be
  read as an upper bound on strict, first-cause mechanical discovery.
- **Shared live Postgres across branches**, same container — the same
  confound Experiments 1 and 2 both independently hit (untracked entity-type
  rows, missing CHECK constraints from earlier session work).
- **API-tier scope expansion.** This mission deliberately required full
  corrections support, unlike Experiment 2's mutation — 7 of 19 normalized
  required sites fell in the API/HTTP tier, which has **zero** mechanical
  guard on either architecture. This is the dominant reason Condition B's
  as-experienced MDR undershot the pre-registered prediction.
- **Verification-environment hazard (BS3-03).** A shared `api/obj/` NuGet
  restore artifact caused a spurious build failure during the orchestrating
  session's own re-verification of Condition B — an artifact of the
  verification environment, not either agent's actual work.

## Positive verification finding (§39.5)

Across the entirety of independent re-verification, every build/test/
architecture-check result either agent self-reported was reproduced exactly
against their actual committed diffs. **Zero discrepancies** were found
between either agent's self-report and independent re-verification, across
the whole trial.

## Hypothesis dispositions (source report §31, reproduced exactly)

| Hypothesis | Disposition |
|---|---|
| H3.1 hardening reduces search/manual inspection | PARTIALLY SUPPORTED (search -63%; unique files inspected did not clearly drop) |
| H3.2 hardening reduces repair loops/verification failures | SUPPORTED (repair loops -50%) |
| H3.3 hardening reduces silent structural omissions | CONTRADICTED (identical no-op outcome in both conditions) |
| H3.4 hardening reduces total required boundary changes | CONTRADICTED (RCS identical, 19=19) |
| H3.5 hardening eliminates semantic implementation errors | CONTRADICTED (identical no-op evaded every mechanical check on both architectures) |
| H3.6 mechanical feedback can substitute for agent inference/search effort | MIXED / PARTIALLY SUPPORTED, with the qualification that the substitution only occurs for sites the agent's own strategy actually exposes to it before finding them another way, and only in tiers the hardening actually covers |

## Supported claims

- Mechanical boundary hardening measurably reduced two real cost proxies
  (search operations, repair loops) in this trial.
- It did not change required-work volume (BCA, RCS) or close the
  present-but-inert-arm semantic no-op class — both remained exactly where
  Experiment 2 already found them.
- Higher Mechanical Discovery Rate is not equivalent to lower engineering
  cost: Condition B had a **lower** as-experienced MDR than Condition A while
  simultaneously having substantially **lower** search and repair-loop
  costs. These two proxies moved in opposite directions in this trial.
- Boundary Change Amplification of 4.0 boundary files per semantic decision
  replicated a third time, across three separate experiments, three separate
  `ObservedValue` cases, and (in this experiment specifically) two separate
  architectures.

## Explicitly NOT supported by this experiment (source report §34, reproduced)

- Does not show State Programming, F#, or this specific hardening approach
  is superior to any other architecture (no control implementation in a
  different architecture was built).
- Does not show mechanical discovery guarantees semantic correctness (the
  opposite was directly demonstrated in both conditions).
- Does not show one AI agent trial generalizes to all AI agents, or that
  this one mutation generalizes to all domain changes.
- Does not establish a confirmed token or wall-clock cost reduction (see the
  telemetry caveat above) — this remains **OPEN**, not answered, due to
  incomplete Condition B telemetry.
- Does not establish causality beyond these two specific, controlled runs.

## Quality and limitations

- A single paired trial (n=1 per condition) — a case study, not a
  statistically powered comparison; no claim of general statistical
  significance is made anywhere in the source report.
- Token/tool-call/wall-clock figures for Condition B are a documented lower
  bound, not a total — treat any comparison using them as provisional.
- Both conditions were executed by subagents from the same model family in
  the same environment; no cross-model or cross-tool comparison was made.
