---
id: HY-SDE-2026-0005
title: Hardening eliminates semantic implementation errors
status: rejected
type: hypothesis
disposition: rejected
confidence: high
evidence_for: []
evidence_against: [EV-HN-2026-0004, EV-HN-2026-0005]
created: 2026-09-02
updated: 2026-09-02
tags: [experiment-2, experiment-3, no-op, semantic-error]
---

# HY-SDE-2026-0005

**Statement (originally H3.5 in HelixNote Experiment 3):** Hardening
eliminates the class of defect where code compiles, satisfies architecture
rules, and satisfies contract checks, yet performs the wrong or no
behavior.

**Evidence for:** None.

**Evidence against:** The identical no-op mutation evaded the compiler,
the architecture check, and both of Experiment 2's own dedicated contract
tests (schema agreement, field-vocabulary agreement) on the hardened
branch. Only integration testing and direct data inspection caught it, in
both conditions of both Experiment 2 and Experiment 3
[EV-HN-2026-0004, EV-HN-2026-0005].

**Disposition:** CONTRADICTED, directly confirmed rather than merely
inferred, at high confidence (0.85). This is the single most-replicated
negative finding in this research program and underwrites
`method/VERIFICATION-METHOD.md`'s REQUIRED behavioral-check row.
