# State Directed Engineering handoff

## Objective

Review the three committed structural-locality/navigation research notes and
integrate justified findings into a coherent, versioned SDE methodology while
preserving prior evidence. Complete under `WI-0026`; the canonical synthesis
is
`research/packages/RP-SDE-2026-0002--structural-locality-and-navigation-integration.md`.

## Work completed

- Added SDE/method v0.2 structural-locality, bounded-reasoning, semantic-map,
  feature-manifest, local-first navigation, context-escalation, greenfield,
  semantic-no-op, defect-taxonomy, and T0–T6 telemetry guidance.
- Reconciled local-first discovery with mechanical-first propagation: locate
  and understand the declared authority first; then use compiler,
  architecture, and contract feedback before broad exploratory search.
- Added the `EV-SDE-2026-0006`, `HY-SDE-2026-0007/0008`,
  `TH-SDE-2026-0005`, and `DF-SDE-2026-0004` evidence chain, plus journal and
  REP.
- Identified `context/ARCHITECTURE.md` as this repository's existing semantic
  map; no duplicate root `SDE-MAP.md` or artificial feature manifests were
  created for the methodology repository.
- Advanced `@echelon-foundry/sde` from 1.0.1 to 1.1.0, method v0.2, with 18
  managed files; added templates and automatic distributed-link relocation.
- Extended `sde verify` with configurable `SDE-STRUCT-001` physical-line
  warnings. Semantic findings `002`–`004` remain manual/deferred.
- Updated project charter, current state, decisions, risks, research queue,
  chronology, templates, distribution documentation, and generated registries.

## Preserved baselines and decisions

- `Notes/`, `method/CONSTRUCTION-METHOD-v0.1.md`, accepted HelixNote evidence,
  and the v0.1 migration journal/REP are byte-for-byte unchanged; completion
  checksum verification passed.
- The roadmap's referenced greenfield trial was not promoted: no accepted
  experiment/evidence record exists and canonical state says the first
  non-HelixNote validation has not run.
- Method contracts and predicted benefits are separate. V0.2 adopts the
  contracts; cost/correctness improvements remain experimental.
- Package semver is independent: methodology v0.2 is distributed by npm
  package v1.1.0, not package v0.2.

## Validation

- `npm test` in `distribution/`: 30 passed, 0 failed; final suite duration
  about 508 ms.
- `npm pack --dry-run --cache /tmp/wi-0026-npm-cache`: passed; package v1.1.0,
  38 files, 18 managed execution files. The first dry-run using the default
  npm cache failed because that external cache contains root-owned files; no
  repository defect was implicated, and the explicit temporary-cache retry
  passed.
- Changed-source Markdown links: 39 files checked, no missing targets.
- Built distribution Markdown links: 17 files checked, no missing targets.
- Default structural scan: 25 source files, one non-blocking strong-review
  warning at `tools/ros_cli.mjs` (1,085 lines).
- Frozen-artifact SHA-256 comparison: all source notes, v0.1 method, accepted
  HelixNote evidence, and prior journal/REP passed.
- `git diff --check`: passed.
- `./ros registry check`: current after generation.
- `./ros validate --json`: valid, zero findings before work-item completion;
  rerun after the completion transition.

## Defects and repair loops

- **Repository/Automation:** the first structural extension set omitted `.mjs`
  and `.sh`; a manual repository scan exposed the false zero-finding result.
  Both extensions and a regression test were added.
- **Repository/Automation:** canonical Markdown links can break when doctrine
  and method sources move to different distribution directories. Build-time
  link relocation and a test now preserve installed navigation.
- **Methodology/evidence:** the roadmap's unregistered greenfield-trial claim
  conflicts with canonical state. It remains preserved in source evidence but
  is explicitly bounded everywhere it could affect method status.
- **Tooling/Build environment:** the default npm cache permission error caused
  one package-check retry; the check passed with an isolated cache.

## Unresolved questions and risks

1. V0.2 has not been validated end to end outside HelixNote.
2. Neither responsibility-cluster nor manifest effectiveness has controlled
   evidence; manifest drift and hidden cross-cutting context remain risks.
3. LOC, CER, and Discovery Expansion are diagnostics, not conformance or
   quality gates.
4. `SDE-STRUCT-002`–`004`, map/manifest completeness, and undeclared
   dependencies lack a reliable portable analyzer.
5. No authoritative token, cost, or tool-call telemetry was available for
   this mission; those values remain unreported rather than estimated.

## Next recommended action

Scope and start `WI-0019`: choose the non-HelixNote project and frozen
requirement, preregister conditions and T0–T6 measures, freeze the exact
method/package version per condition, then execute the first validation.
`WI-0027` is a separate low-priority structural review and should not block
that trial.
