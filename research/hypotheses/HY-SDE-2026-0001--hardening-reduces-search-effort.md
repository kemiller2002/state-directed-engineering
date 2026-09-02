---
id: HY-SDE-2026-0001
title: Mechanical boundary hardening reduces agent search/manual-inspection effort
status: accepted
type: hypothesis
disposition: provisionally-accepted
confidence: {label: medium, estimate: 0.55, rationale: "One controlled A/B trial; large effect on search operations (-63%), no clear effect on unique files inspected."}
source_experiment: EX (see EV-HN-2026-0005)
evidence_for: [EV-HN-2026-0005]
evidence_against: []
created: 2026-09-02
updated: 2026-09-02
tags: [experiment-3, search, mechanical-discovery]
---

# HY-SDE-2026-0001

**Statement (originally H3.1 in HelixNote Experiment 3):** Hardening the
boundary layer with mechanical discovery mechanisms reduces the amount of
repository search and manual inspection an executing agent needs.

**Evidence for:** Search operations dropped 63.2% (38 → 14) between
Condition A (baseline) and Condition B (hardened) in Experiment 3
[EV-HN-2026-0005].

**Evidence against:** Unique files inspected did not clearly decrease (27 vs.
~30, using different counting conventions in each agent's own log) — search
and inspection are not the same construct and moved differently in this
trial.

**Unknowns:** Whether the search-operation reduction generalizes beyond this
one mutation, this one pair of architectures, and this one model family.

**Disposition:** PARTIALLY SUPPORTED / provisionally-accepted at medium
confidence — real, measured effect on one proxy (search operations), no
effect shown on a related proxy (file inspection).

**Implications:** SDE's Construction Method should not claim hardening
reduces "how much you have to look at" broadly; it should claim, more
narrowly, that hardening can reduce exploratory search specifically, in
tiers the hardening actually covers.
