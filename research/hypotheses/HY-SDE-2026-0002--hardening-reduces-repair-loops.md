---
id: HY-SDE-2026-0002
title: Hardening reduces repair loops and verification failures
status: supported
type: hypothesis
disposition: provisionally-accepted
confidence: medium
evidence_for: [EV-HN-2026-0004, EV-HN-2026-0005]
evidence_against: []
created: 2026-09-02
updated: 2026-09-02
tags: [experiment-3, repair-loops]
---

# HY-SDE-2026-0002

**Statement (originally H3.2 in HelixNote Experiment 3):** Hardening
reduces the number of repair loops and verification failures an agent
needs to complete an equivalent change.

**Evidence for:** Repair loops dropped 50% (2 → 1) between Condition A and
Condition B in Experiment 3 [EV-HN-2026-0005].

**Evidence against:** Experiment-caused build/test failure counts were low
and comparable in both conditions (not clearly reduced).

**Disposition:** SUPPORTED, in this trial, at medium confidence (0.55) —
one clean proxy improved, a related proxy did not move as clearly.

**Implications:** `method/CONSTRUCTION-METHOD-v0.1.md` places compiler/
architecture/contract repair ahead of broad search partly on the strength
of this finding.
