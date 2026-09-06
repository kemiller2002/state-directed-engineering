---
id: HY-SDE-2026-0008
title: Semantic maps and feature manifests reduce discovery expansion
research_area: state-directed-engineering
status: active
type: hypothesis
disposition: unresolved
confidence: low
confidence_estimate: 0.30
author_agent: OpenAI Codex (runtime model identifier not exposed)
evidence_for: [EV-SDE-2026-0006]
evidence_against: []
related_theories: [TH-SDE-2026-0005]
supersedes: []
superseded_by: []
created: 2026-09-05
updated: 2026-09-05
tags: [navigation, feature-manifest, discovery-expansion, cer]
---

# HY-SDE-2026-0008

## Statement

For routine feature-level changes, a current repository semantic map and
feature manifest will reduce repository-wide searches, unrelated reads, and
unexpected Context Surface expansion compared with ordinary search-led
discovery, without reducing correctness.

## Mechanism

The map routes a task to a semantic boundary; the manifest identifies
authority, contracts, tests, dependencies, and modification boundaries. The
agent follows declared context before targeted or global exploration.

## Predictions

- Fewer repository-wide searches before first valid edit.
- Lower Discovery Expansion and fewer undeclared dependency reads.
- Actual Context Surface remains closer to the declared surface.
- Manifest drift appears as observable unexpected expansion rather than hidden
  agent inconvenience.

## Evidence that would support it

A controlled same-repository, same-task, same-agent comparison with and without
the navigation contract, using contemporaneous discovery telemetry and final
correctness checks.

## Evidence that would contradict it

No reduction in discovery cost, lower correctness because required context was
omitted, or equivalent results only because agents ignore the manifest and
perform broad search anyway.

## Tests performed and results

None. `EV-SDE-2026-0006` is a proposal and motivating case, not an executed
navigation experiment.

## Falsification attempts

The contract explicitly permits declared-dependency traversal, targeted
discovery, and global-search escalation. This avoids defining success as zero
external reads and admits legitimate cross-cutting changes. Staleness remains
a competing explanation and adoption risk.

## Current assessment

Unresolved, Low confidence (0.30). Repository maps and manifests are adopted as
low-cost routing guidance; their measured effect remains experimental. CER and
Discovery Expansion are diagnostics, never pass/fail quality gates.

## Next experiment

Run a preregistered paired navigation trial after the first SDE v0.2 adopting
project has real feature manifests. Freeze task, model, starting state,
verification, and metric definitions before either condition.

