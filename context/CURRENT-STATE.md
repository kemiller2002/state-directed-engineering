# State Directed Engineering current state

## Repository status

SDE/method v0.2 was integrated on 2026-09-05 under `WI-0026`; the durable
record is
`research/packages/RP-SDE-2026-0002--structural-locality-and-navigation-integration.md`.
It adds structural locality, bounded reasoning scope, repository semantic-map
and feature-manifest contracts, local-first context escalation, greenfield
guidance, explicit defect/context telemetry, and warning-only portable
structural review. The npm distribution is v1.1.0 and carries method v0.2.

Construction Method v0.1 and the original accepted HelixNote evidence remain
frozen historical records. The three source notes remain unchanged.

## Observed facts

- Domain evidence accepted: HelixNote Experiments 1–3 (`EV-HN-2026-0003`
  through `0005`) and the Four-Tier/Boundary layering (`EV-HN-2026-0001`,
  `0002`).
- Derived note evidence is accepted as `EV-SDE-2026-0006`; it supplies
  architecture and method rationale, not a controlled locality/navigation
  result.
- No vertical slice of SDE's Construction Method has run on a non-HelixNote
  project. The roadmap note mentions a greenfield trial, but no accepted
  `EX-`/`EV-` record supports it; `method/FIRST-VALIDATION-DESIGN.md` remains
  designed, not executed.
- `TH-SDE-2026-0005` treats bounded reasoning scope as a candidate theory,
  Medium (0.50). Locality and manifest outcome hypotheses remain unresolved,
  Low confidence (`HY-SDE-2026-0007`, `0008`).
- The distribution suite passes 30 tests. The default structural scan inspects
  25 source files and reports one warning: `tools/ros_cli.mjs`, 1,085 physical
  lines, strong-review band. The warning is captured as `WI-0027`; it is not
  proof of nonconformance.

## Assumptions

- Maps/manifests are inexpensive enough to maintain and remain useful only
  when they route to—rather than duplicate—semantic authority.
- Physical LOC and context ratios can prompt investigation but cannot prove
  correctness, cohesion, or cost reduction.
- HelixNote evidence is sufficient to retain SDE's mechanism-specific v0.1
  foundation, not to establish v0.2 or the method as a whole.

## Work state

- `WI-0019` remains ready: execute the first non-HelixNote validation after a
  dedicated scoping and preregistration pass.
- `WI-0027` is captured, low priority: review `tools/ros_cli.mjs`
  responsibility boundaries without assuming a split is required.

## Largest decision-relevant unknown

Does SDE v0.2, followed as a complete workflow, improve real engineering
cost or correctness—and specifically do responsibility clusters and
maps/manifests reduce context/discovery expansion without hiding legitimate
cross-cutting dependencies?

## Baseline for the next validation

Freeze the target repository, requirement, agent/runtime, acceptance checks,
method/package version, semantic map/manifests, and metric definitions before
T0. Treat v0.1 and v0.2 as distinct treatments; do not retrofit v0.2 context
data into an earlier run. Capture T0–T6 cumulatively and report unavailable
tokens/cost/tool counts as unavailable.
