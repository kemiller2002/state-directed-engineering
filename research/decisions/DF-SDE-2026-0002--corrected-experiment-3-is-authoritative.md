---
id: DF-SDE-2026-0002
title: Corrected Experiment 3 (commit 8ac05fd) is authoritative over any earlier draft or transition summary
status: accepted
type: decision-record
created: 2026-09-02
updated: 2026-09-02
tags: [governance, experiment-3, supersession]
---

# DF-SDE-2026-0002

## Context

HelixNote's Experiment 3 report went through at least two committed states:
an original draft (commit `39bfa64`, containing a log-count error — "167"
entries instead of the correct 76 — and omitting harness-level telemetry
that was available but not yet surfaced) and a correction (commit `8ac05fd`,
which fixed the count, added the harness telemetry with its critical
incompleteness caveat for Condition B, added the third BCA replication
figure, and added the positive self-report-reliability finding). The
migration mission also references a transition artifact,
`STATE-PROGRAMMING-EXPERIMENT-3-TO-ENGINEERING-TRANSITION_2026-09-01_2019_EDT.txt`,
which this migration searched for across every reachable branch of both
repositories (`git log --all --diff-filter=A` for the filename pattern) and
on the local filesystem, and did not find. It is presumed to have been an
uncommitted, ephemeral artifact from the orchestrating session that produced
the correction, never persisted to either repository.

## Decision

Commit `8ac05fd` on `experiment/agent-cost-comparison-v3` is the sole
authoritative source for Experiment 3 figures in SDE. Where the
never-located transition artifact, the earlier draft commit `39bfa64`, or
any other summary states a figure that differs from `8ac05fd`, `8ac05fd`
wins, without exception.

## Evidence

`EV-HN-2026-0005` reproduces the corrected figures directly from `8ac05fd`.
`39bfa64` is not deleted or rewritten in HelixNote (this migration does not
touch HelixNote at all) — it remains HelixNote's own git history, correctly
superseded by its own next commit, which is HelixNote's own internal
practice, not something this migration performed.

## Consequences

Every SDE doctrine and evidence document citing Experiment 3 in this
migration cites `8ac05fd` explicitly by commit SHA, not merely "Experiment
3," to make this authority chain checkable by a future reader without
re-deriving it.

## Reversibility

Fully reversible if a newer, further-corrected HelixNote commit supersedes
`8ac05fd` in the future — this decision record would itself need to be
superseded by a new one naming the newer commit, per
`framework/protocols/SUPERSESSION.md`.

## Status

`accepted`.
