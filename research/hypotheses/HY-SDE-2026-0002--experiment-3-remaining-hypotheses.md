---
ids: [HY-SDE-2026-0002, HY-SDE-2026-0003, HY-SDE-2026-0004, HY-SDE-2026-0005, HY-SDE-2026-0006]
title: Experiment 3 hypotheses H3.2-H3.6 (repair loops, silent omission, boundary volume, semantic errors, mechanical substitution)
status: accepted
type: hypothesis-registry
evidence_for: [EV-HN-2026-0004, EV-HN-2026-0005]
created: 2026-09-02
updated: 2026-09-02
tags: [experiment-2, experiment-3, mdr, bca, no-op]
---

# Hypothesis registry: Experiment 3 H3.2-H3.6

Each entry below is a stable, individually citable hypothesis record. Source:
HelixNote Experiment 3, corrected report, commit `8ac05fd`
[EV-HN-2026-0005], cross-referenced against Experiment 2 [EV-HN-2026-0004]
where the hypothesis originates there.

## HY-SDE-2026-0002 — Hardening reduces repair loops/verification failures

**Statement (H3.2):** Hardening reduces the number of repair loops and
verification failures an agent needs to complete an equivalent change.

**Evidence for:** Repair loops dropped 50% (2 → 1) in Experiment 3.

**Evidence against:** Experiment-caused build/test failure counts were low
and comparable in both conditions (not clearly reduced).

**Disposition:** SUPPORTED, in this trial. Confidence: medium (0.55) — one
trial, one clean proxy improved, a related proxy (build/test failure counts)
did not move as clearly.

## HY-SDE-2026-0003 — Hardening reduces silent structural omissions

**Statement (H3.3):** Hardening reduces the probability a required boundary
change is silently omitted without detection.

**Evidence for:** None in Experiment 3 for the specific residual shape
tested.

**Evidence against:** The semantic no-op challenge (a structurally-present,
semantically-inert fan-out arm) produced an **identical** undetected outcome
in both conditions — the hardening this research program built provides zero
benefit against this exact defect shape. This exact result replicated
Experiment 2's own Phase 20 finding [EV-HN-2026-0004] on a third,
independently-designed case.

**Disposition:** CONTRADICTED, for this residual shape specifically. Note:
Experiment 2's own different "missing arm entirely" shape (a case not
appearing at all) remains closed by Target C(a)'s exhaustiveness — this
hypothesis is contradicted for the "present but inert" shape only, not for
every silent-omission shape. Confidence in the contradiction: high (0.80) —
directly demonstrated twice, by two independent agents, on two independent
architectures.

## HY-SDE-2026-0004 — Hardening reduces total required boundary changes

**Statement (H3.4):** Hardening reduces how many boundary files/sites a new
semantic decision requires touching (reduces Boundary Change Amplification).

**Evidence for:** None.

**Evidence against:** BCA was measured at 4.0 in Experiment 1, 4.0 in
Experiment 2, and 4.0 in both conditions of Experiment 3 — three independent
replications, three separate `ObservedValue` cases, two separate
architectures, all identical.

**Disposition:** CONTRADICTED, with high confidence (0.85) given the
three-for-three replication. This is Working Principle 34 of the SDE
migration mission and must not be silently reversed by future doctrine
without new, contradicting evidence.

## HY-SDE-2026-0005 — Hardening eliminates semantic implementation errors

**Statement (H3.5):** Hardening eliminates the class of defect where code
compiles, satisfies architecture rules, and satisfies contract checks, yet
performs the wrong or no behavior.

**Evidence for:** None.

**Evidence against:** The identical no-op mutation evaded the compiler, the
architecture check, and both of Experiment 2's own dedicated contract tests
(schema agreement, field-vocabulary agreement) on the hardened branch. Only
integration testing and direct data inspection caught it, in both
conditions of both Experiment 2 and Experiment 3.

**Disposition:** CONTRADICTED, directly confirmed (not merely inferred),
confidence high (0.85).

## HY-SDE-2026-0006 — Mechanical feedback can substitute for agent search/inference effort

**Statement (H3.6, the central conceptual hypothesis of Experiment 3):**
Mechanical architectural feedback (compiler errors, failing contract tests)
can substitute for some of the search and inference effort an agent would
otherwise need to spend.

**Evidence for:** Architecture-potential MDR is genuinely higher on the
hardened branch (52.6% vs. 42.1%); search operations and repair loops were
both substantially lower in the hardened condition.

**Evidence against / complicating:** As-experienced MDR was *lower*, not
higher, for the hardened condition (31.6% vs. 42.1%) — the substitution did
not occur for sites the executing agent found by reading ahead of the
compiler. Roughly a third of required sites (the API tier) received no
mechanical substitute at all in this trial, because that tier is unguarded
by either architecture.

**Disposition:** MIXED / PARTIALLY SUPPORTED, with an explicit qualification:
substitution occurs only for sites an agent's own strategy actually exposes
to the mechanism *before* finding them another way, and only in tiers the
hardening actually covers. Confidence: medium (0.50) — the central claim is
neither cleanly confirmed nor cleanly refuted by this one trial.

**Implication for SDE Agent Execution Rules:** an agent optimized to minimize
its own compile/test cycles by reading broadly first may systematically
under-realize the benefit of mechanical hardening, compared to an agent that
edits incrementally and lets the compiler drive discovery. This is
operationalized in `method/AGENT-EXECUTION-RULES.md`.
