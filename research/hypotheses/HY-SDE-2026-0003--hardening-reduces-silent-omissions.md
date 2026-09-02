---
id: HY-SDE-2026-0003
title: Hardening reduces silent structural omissions
status: rejected
type: hypothesis
disposition: rejected
confidence: high
evidence_for: []
evidence_against: [EV-HN-2026-0004, EV-HN-2026-0005]
created: 2026-09-02
updated: 2026-09-02
tags: [experiment-2, experiment-3, no-op, silent-omission]
---

# HY-SDE-2026-0003

**Statement (originally H3.3 in HelixNote Experiment 3):** Hardening
reduces the probability a required boundary change is silently omitted
without detection.

**Evidence for:** None, for the specific residual shape tested.

**Evidence against:** The semantic no-op challenge (a structurally-present,
semantically-inert fan-out arm) produced an **identical** undetected
outcome in both conditions of Experiment 3 — a direct replication of
Experiment 2's own Phase 20 finding [EV-HN-2026-0004, EV-HN-2026-0005].

**Disposition:** CONTRADICTED, for this residual shape specifically, at
high confidence (0.80) — directly demonstrated twice, by two independent
agents, on two independent architectures. Note: Experiment 2's own
different "missing arm entirely" shape remains closed by exhaustiveness
checking — this hypothesis is rejected for the "present but inert" shape
only, not for every silent-omission shape.

**Implications:** `method/VERIFICATION-METHOD.md` requires a behavioral/
integration check for any fan-out or dispatch arm whose body is not itself
type-checked, regardless of how hardened the surrounding architecture is.
