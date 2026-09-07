# State Directed Engineering handoff

## Objective and outcome

`WI-0028` independently reviewed the three frozen structural-locality,
navigation, and roadmap notes against the committed SDE v0.2 integration.
The review retained method v0.2, corrected four cross-surface consistency gaps,
and prepared `@echelon-foundry/sde` v1.1.1 because v1.1.0 is already
published. The canonical review is
`research/packages/RP-SDE-2026-0003--sde-v0.2-authoritative-surface-review.md`.

The method remains evidence-bounded: structural locality, deterministic
navigation, Context Surface, CER, and Discovery Expansion are adopted at their
documented guidance or experimental levels, not promoted to proven outcome
claims.

## Authoritative changes

- `AGENTS.md` is the repository-level routing policy. It points agents to the
  semantic map, current method, and execution protocol without restating
  semantic authority.
- `method/CONSTRUCTION-METHOD-v0.2.md`,
  `method/NAVIGATION-AND-CONTEXT.md`, and
  `method/AGENT-EXECUTION-RULES.md` now consistently permit a semantic-map
  entry with an explicit not-needed rationale to replace a separate manifest
  for a small, obvious area. Meaningful bounded features still use manifests.
- `method/ENGINEERING-METRICS.md` requires reuse of an existing
  ROS/project/harness telemetry authority, T0 capability discovery, explicit
  zero/missing/unavailable states, units and scope, and adaptive preservation
  of trustworthy provider fields through sanctioned extensions or sanitized
  raw data.
- `doctrine/EVIDENCE-TO-ENGINEERING-MAP.md` records the evidential boundary for
  that telemetry rule.
- Execution, completion, trial, and distributed work-item templates now
  expose agent/provider/model/runtime, telemetry authority, cache-write,
  time/token milestones, context-read categories, and plural site-level change
  classes.
- `distribution/authored/README.template.md` carries the corrected routing;
  `distribution/test/build.test.mjs` verifies telemetry semantics and the
  justified map-only route; `distribution/package.json` advances to v1.1.1.
- `context/CURRENT-STATE.md`, `context/KNOWN-RISKS.md`, and
  `research/CHRONOLOGY.md` record the current release/research state and correct
  Context Expansion Ratio terminology.
- `research/journals/JR-SDE-2026-0003--v0.2-authoritative-surface-review.md`
  holds the contemporaneous execution record. `RP-SDE-2026-0003` holds the
  synthesis, evidence limits, findings, and completion evidence.

## Contracts confirmed or revised

- **Structural locality:** semantic area, semantic authority, responsibility
  cluster, and physical file remain distinct. LOC bands are configurable
  review signals, not semantic laws or universal gates.
- **Navigation/context:** task to semantic map to feature manifest (when
  required) to local authority/contracts/tests/dependencies is the default.
  Targeted and repository-wide search remain explicit escalation mechanisms.
- **Feature manifests:** manifests route to authority; they do not duplicate
  it. Small/obvious areas may use a map-only rationale. Cross-boundary work and
  undeclared dependencies are allowed but recorded as evidence.
- **Verification:** compiler, architecture, contract, behavioral/integration,
  and runtime/reconciliation mechanisms own distinct defect classes. A
  semantic no-op requires behavioral evidence; exhaustiveness is insufficient.
- **Telemetry:** Context Surface, CER, Discovery Expansion, and acquisition
  fields retain declared units, evidence class, and completeness. CER/DE are
  diagnostics, never pass/fail scores. Missing measurements remain missing.
- **Construction:** local-first navigation identifies authority before
  mechanical-first propagation. This is consistent with the bounded greenfield
  vertical-slice workflow and explicit stop conditions.

## Doctrine and evidence status

- **Established method:** singular semantic authority; constrained legal
  state/action; deliberate boundary contracts; late weakening and validated
  re-entry; earliest trustworthy detection; behavioral evidence for semantic
  no-ops; honest evidence and stop conditions.
- **Engineering guidance requiring validation:** responsibility clusters,
  composition-oriented roots, semantic maps, low-ceremony manifests,
  local-first discovery, configurable LOC review bands, and adaptive context
  telemetry.
- **Experimental:** causal claims that locality or manifests reduce cost or
  defects; Context Surface counting choices; CER and Discovery Expansion;
  proposed semantic structural findings beyond reliable physical LOC review.

## Contradictions resolved

1. Root instructions previously omitted SDE-specific deterministic routing.
2. Several execution paths made a manifest unconditional although the
   manifest contract already allowed an explicit map-only exception.
3. Templates forced one change class although v0.2 classifies each change site.
4. Telemetry listed fields without clearly binding them to an existing
   collector or distinguishing zero from unavailable/not captured.
5. `KNOWN-RISKS.md` used “Context Efficiency Ratio” instead of the canonical
   “Context Expansion Ratio.”

No source note, v0.1 method, accepted HelixNote evidence, or prior accepted
journal/REP was rewritten.

## Architectural findings

- No undeclared dependency or duplicated semantic authority was found during
  this bounded review.
- The repository already has an adequate semantic map in
  `context/ARCHITECTURE.md`; adding a competing map or empty manifests would
  add ceremony without routing value.
- One warning-only structural finding remains: `tools/ros_cli.mjs` has 1,085
  physical lines (`SDE-STRUCT-001` strong-review band). `WI-0027` tracks its
  responsibility review; size alone does not require decomposition.
- Reliable portable automation does not yet exist for semantic findings
  `SDE-STRUCT-002`–`004`, manifest completeness, or undeclared dependencies.

## Validation evidence

- Final `npm test`: 32 passed, 0 failed; deterministic package build included.
- `npm pack --dry-run` with isolated cache: passed; v1.1.1, 38 files, 46.8 kB
  packed and 144.2 kB unpacked.
- Isolated generated-project `init`, `status`, and `verify`: passed; 18 managed
  files, zero modified/missing files.
- Direct structural scan: 25 source files, one warning noted above.
- Built-package Markdown links: 17 files, 9 links, zero missing.
- Frozen-path and whitespace checks: passed.
- Canonical Markdown links: 70 files, 30 local links, zero missing.
- ROS registries rebuilt/current; `./ros validate --json` returned valid with
  zero findings before the closing transition and is rerun after it.

The only source repair loop fixed a whitespace-sensitive test assertion; the
built content was already correct. A separate ad hoc link-check invocation was
retried after its command string was malformed.

## Evidence gaps and risks

- No authoritative token, cost, tool-call, search, file-read, boundary-read,
  or time-to-edit counter was exposed. These values are missing, not estimated.
- V0.2 still lacks a complete controlled validation outside HelixNote.
- Maps/manifests can stale or duplicate authority if their routing-only rule is
  ignored; cross-cutting changes can legitimately expand context.
- Package v1.1.1 is prepared locally but was not published by this mission.

## Next recommended action

Scope and start `WI-0019`: freeze a non-HelixNote repository, requirement,
agent/runtime, method/package version, navigation treatment, acceptance checks,
and metric definitions before T0, then execute the first controlled validation.
Keep `WI-0027` as a separate, non-blocking structural review.
