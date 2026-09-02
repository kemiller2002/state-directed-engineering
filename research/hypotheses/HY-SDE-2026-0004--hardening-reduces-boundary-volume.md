---
id: HY-SDE-2026-0004
title: Hardening reduces total required boundary changes
status: rejected
type: hypothesis
disposition: rejected
confidence: high
evidence_for: []
evidence_against: [EV-HN-2026-0003, EV-HN-2026-0004, EV-HN-2026-0005]
created: 2026-09-02
updated: 2026-09-02
tags: [experiment-1, experiment-2, experiment-3, bca]
---

# HY-SDE-2026-0004

**Statement (originally H3.4 in HelixNote Experiment 3):** Hardening
reduces how many boundary files/sites a new semantic decision requires
touching (reduces Boundary Change Amplification).

**Evidence for:** None.

**Evidence against:** BCA measured at 4.0 in Experiment 1, 4.0 in
Experiment 2, and 4.0 in both conditions of Experiment 3 — three
independent replications, three separate `ObservedValue` cases, two
separate architectures, all identical [EV-HN-2026-0003, EV-HN-2026-0004,
EV-HN-2026-0005].

**Disposition:** CONTRADICTED, at high confidence (0.85), given the
three-for-three replication. See `research/theories/TH-SDE-2026-0004--*.md`
and `research/decisions/DF-SDE-2026-0003--*.md` (this migration explicitly
defers trying to fix this, rather than silently reversing the finding).
