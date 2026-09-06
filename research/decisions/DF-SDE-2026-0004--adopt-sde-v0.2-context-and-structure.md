---
id: DF-SDE-2026-0004
title: Adopt SDE v0.2 structural locality and deterministic context discovery
status: accepted
type: decision-record
created: 2026-09-05
updated: 2026-09-05
evidence: [EV-HN-2026-0001, EV-HN-2026-0002, EV-HN-2026-0004, EV-HN-2026-0005, EV-SDE-2026-0006]
theories: [TH-SDE-2026-0003, TH-SDE-2026-0004, TH-SDE-2026-0005]
related_documents: [RP-SDE-2026-0002, method/CONSTRUCTION-METHOD-v0.2.md]
tags: [governance, sde-v0.2, structural-locality, navigation, verification]
---

# DF-SDE-2026-0004 — Adopt SDE v0.2 context and structure contracts

## Context

SDE v0.1 defines semantic authority, four responsibility tiers, boundary
preservation, a mechanical-first construction order, and layered
verification. The notes preserved by `EV-SDE-2026-0006` identify two missing
dimensions: implementation responsibilities can become physically and
cognitively over-concentrated, and an agent can fail to find an otherwise
well-bounded feature deterministically.

The change is material and cross-cutting. It affects architecture, method,
agent procedure, templates, metrics, the distribution package, and the
meaning of `sde verify`; it therefore requires a Decision Record and a minor
methodology version.

## Decision

1. Adopt SDE/method v0.2 as a backward-compatible expansion of v0.1.
2. Preserve `method/CONSTRUCTION-METHOD-v0.1.md` and all accepted research
   artifacts unchanged. V0.2 names v0.1 as its predecessor without
   retroactively applying v0.2 to completed work.
3. Make bounded reasoning scope an SDE design objective at candidate-theory
   strength, not an established causal result.
4. Add a Structural Locality contract that distinguishes semantic area,
   semantic authority, responsibility cluster, and physical module/file.
   Physical decomposition may not create competing semantic authorities.
5. Add a local-first navigation and context-escalation method. A normal path
   is Task → repository semantic map when needed → feature manifest → local
   authority/contracts/tests → declared dependencies → change → verification.
   Targeted and repository-wide search remain explicit fallbacks.
6. Standardize lightweight Markdown repository maps and feature manifests.
   Manifests route to authoritative representations; they do not restate
   semantic rules. Existing equivalent maps should be evolved, not duplicated.
7. Reconcile local-first discovery with mechanical-first propagation: acquire
   enough declared local context to identify the responsible authority, make
   the smallest authoritative change, then use compiler/architecture/contract
   feedback before broad exploratory search.
8. Add Context Surface, Context Expansion Ratio, and Discovery Expansion as
   optional experimental diagnostics. They are not quality gates, and missing
   measurements remain missing.
9. Add the explicit defect taxonomy and T0–T6 telemetry checkpoints for
   serious experiments.
10. Extend `sde verify` only with deterministic `SDE-STRUCT-001` physical-line
    review warnings, using documented defaults and optional project config.
    Warnings do not change the success exit code. Defer `SDE-STRUCT-002`
    through `004` and navigation findings until they can be detected reliably.
11. Advance the independently versioned distribution package from v1.0.1 to
    v1.1.0 because it gains backward-compatible content and verification
    capability. Package semver is not the SDE method version.

## Alternatives considered

### Keep v0.1 and publish the notes only

Rejected. Normal engineering agents are intentionally not expected to read
the research archive, so leaving actionable guidance only in `Notes/` would
not change execution and would preserve the documented contradiction.

### Put each concept in root agent instructions

Rejected. That would make agent instructions a competing semantic authority
and duplicate methodology. Root/local instructions should route to the map,
manifest, and canonical method.

### Require JSON/YAML manifests and validate every field immediately

Rejected for now. Markdown with a small required heading contract is easier to
adopt, link, and review without creating an SDE-specific DSL. Mechanical
validation of semantic ownership would create false confidence at this stage.

### Enforce hard LOC limits

Rejected. File size is a signal, language/build conventions vary, and a large
cohesive unit can be safer than fragmented coupled files. The initial tool
reports review bands without failing the build.

### Automate all proposed structural/navigation findings now

Rejected. Declaration concentration, responsibility mixing, duplicate
authority, feature ownership ambiguity, and undeclared dependencies require
language-aware semantic information not reliably available to a portable
zero-dependency verifier.

### Make code generation mandatory to reduce boundary propagation

Rejected. `TH-SDE-2026-0004` establishes the target (construction
optimization) but current evidence does not select generation as the universal
solution.

## Evidence and rationale

- `EV-HN-2026-0002`, `0004`, and `0005` support explicit authority, earliest
  trustworthy detection, and behavioral proof for semantic no-ops.
- `EV-HN-2026-0005` supports the need to distinguish architecture-potential
  guidance from the executing agent's actual discovery strategy.
- `EV-SDE-2026-0006` supplies the structural/navigation synthesis and clearly
  identifies its untested predictions.
- `TH-SDE-2026-0005` records bounded reasoning scope as a candidate theory,
  preserving the evidence boundary.

## Consequences

- Adopting projects gain deterministic context routing and explicit evidence
  requirements for boundary expansion.
- Maintainers must keep maps/manifests current, but may reuse an existing
  equivalent and may omit inapplicable fields with a reason.
- `sde verify` produces non-blocking line-count findings; reviewers remain
  responsible for semantic interpretation.
- Future validation must treat v0.2 as a new experimental treatment and keep
  any v0.1 baseline association intact.
- The first non-HelixNote validation remains unexecuted; its design is updated
  before execution rather than being claimed retroactively.

## Migration

- New work uses `method/CONSTRUCTION-METHOD-v0.2.md`.
- Existing records citing v0.1 remain unchanged and historically valid.
- The distribution map points new package builds to v0.2 while the v0.1
  source remains in the canonical repository.
- Projects upgrading from package v1.0.1 receive new doctrine/method/templates
  and warning-only structural verification. They are not auto-populated with
  guessed project maps or manifests.

## Reversibility and revisit triggers

Documentation and warning defaults are reversible through another versioned
method change. Revisit when controlled trials contradict the navigation or
locality hypotheses, manifest maintenance creates disproportionate overhead,
or reliable language-aware analysis can replace manual findings.

## Status

`accepted`.
