---
id: HY-SDE-2026-0006
title: Mechanical feedback can substitute for agent search/inference effort
status: active
type: hypothesis
disposition: unresolved
confidence: medium
evidence_for: [EV-HN-2026-0005]
evidence_against: [EV-HN-2026-0005]
created: 2026-09-02
updated: 2026-09-02
tags: [experiment-3, mdr, agent-strategy]
---

# HY-SDE-2026-0006

**Statement (H3.6, the central conceptual hypothesis of Experiment 3):**
Mechanical architectural feedback (compiler errors, failing contract tests)
can substitute for some of the search and inference effort an agent would
otherwise need to spend.

**Evidence for:** Architecture-potential MDR is genuinely higher on the
hardened branch (52.6% vs. 42.1%); search operations and repair loops were
both substantially lower in the hardened condition [EV-HN-2026-0005].

**Evidence against / complicating:** As-experienced MDR was *lower*, not
higher, for the hardened condition (31.6% vs. 42.1%) — the substitution did
not occur for sites the executing agent found by reading ahead of the
compiler. Roughly a third of required sites (the API tier) received no
mechanical substitute at all in this trial, because that tier is unguarded
by either architecture [EV-HN-2026-0005].

**Disposition:** MIXED / unresolved, at medium confidence (0.50) — the
central claim is neither cleanly confirmed nor cleanly refuted by this one
trial. Substitution occurs only for sites an agent's own strategy actually
exposes to the mechanism *before* finding them another way, and only in
tiers the hardening actually covers.

**Implications:** `method/AGENT-EXECUTION-RULES.md` operationalizes this as
a RECOMMENDED (not REQUIRED) practice: edit incrementally and let the
compiler drive discovery, rather than reading broadly first. Experiment
3's own §35 recommends a follow-up trial with the investigation-strategy
variable deliberately controlled — see `context/RESEARCH-QUEUE.md` item 3.
