---
id: JR-SDE-2026-0002
title: Structural locality and agent navigation integration journal
research_area: state-directed-engineering
author_agent: OpenAI Codex (runtime model identifier not exposed)
status: accepted
type: journal
created: 2026-09-05
updated: 2026-09-05
related_mission: WI-0026
related_package: RP-SDE-2026-0002
evidence_ids: [EV-SDE-2026-0006]
hypothesis_ids: [HY-SDE-2026-0007, HY-SDE-2026-0008]
theory_ids: [TH-SDE-2026-0005]
tags: [journal, sde-v0.2, structural-locality, navigation, context]
---

# JR-SDE-2026-0002 — Structural locality and agent navigation integration journal

## Objective

Review the three committed research notes under `Notes/`, reconcile justified
findings into a coherent SDE revision, update authoritative methodology and
dependent execution surfaces, preserve earlier evidence and method baselines,
and validate the resulting repository and distribution.

## Starting state

- Work item: `WI-0026`, type `research`, started by ROS at
  `2026-09-05T18:45:43.180Z`.
- Repository commit: `d1b8d8f39b9b3bdc6bbde842b29a1f5b16301e95`.
- Branch: `claude/ros-bootstrap-init-ao9vu4`.
- Starting user-content state: clean. The only dirty paths before the first
  methodology edit were the four ROS work-state files created by adding and
  starting `WI-0026`.
- Current authoritative methodology: SDE v0.1; Construction Method v0.1.
- Current distribution package: `@echelon-foundry/sde` v1.0.1, carrying
  method v0.1.
- Existing non-HelixNote engineering validation: not executed. The current
  authoritative design is `method/FIRST-VALIDATION-DESIGN.md`; `WI-0019` is
  ready but not active.

## Constraints, assumptions, and risks

- `Notes/` is source evidence and will remain unchanged.
- Accepted HelixNote evidence, the v0.1 migration journal/REP, and the v0.1
  Construction Method are treated as frozen baselines.
- The note `Notes/roadmap-to-review.md` refers to an SDE greenfield trial, but
  no corresponding accepted experiment/evidence record exists here and the
  canonical repository state explicitly says the first validation has not
  run. Guidance may be adopted on engineering rationale; no trial result or
  measurement will be invented.
- The notes support a backward-compatible methodology expansion from v0.1 to
  v0.2. The independently versioned npm package is already v1.0.1, so any
  distributed release increment must follow from package semver rather than
  being mislabeled v0.2.
- Feature manifests must route to semantic authority, not duplicate it.
- File size is a review proxy, not semantic truth. Only a deterministic LOC
  warning is initially suitable for automation; responsibility and authority
  duplication require review until a reliable analyzer exists.

## Actions taken

1. Read the user mission in full.
2. Read root and canonical ROS governance, the work protocol, engineering
   standard, REP specification, lifecycle, supersession, and decision rules.
3. Confirmed no assigned work item existed, found only unrelated `WI-0019`,
   captured `WI-0026`, promoted it to ready, started it as research, and read
   its required evidence contract.
4. Inventoried repository files and current Git/work state.
5. Read all three source notes in full:
   `agent-navigation-context-discovery-contract.txt`,
   `state-system-structural-locality-contract.txt`, and
   `roadmap-to-review.md`.
6. Read current SDE doctrine, construction/change/verification/agent/metrics
   methods, first-validation design, repository context, templates, and
   distribution implementation/tests relevant to the proposed changes.
7. Read accepted HelixNote evidence `EV-HN-2026-0001` through `0005` and
   representative current theory/hypothesis/decision records to test the
   notes against the evidence already authoritative in this repository.
8. Confirmed the note-source commit is `d1b8d8f` (`add notes`, authored and
   committed 2026-09-05) and that Git records the directory as `Notes/`.
9. Captured SHA-256 values for every source note, all accepted HelixNote
   evidence files, the v0.1 migration journal/REP, and
   `method/CONSTRUCTION-METHOD-v0.1.md` in
   `/tmp/wi-0026-frozen-sha256.txt`. The checksum-list file itself hashes to
   `7548dcac11692912f8eb5086501eedf330911d39771465b8ac7d8f73357f86ec`.

## Initial observations

1. Existing SDE already makes semantic authority, boundary preservation,
   mechanical-first execution, the failure-detection responsibility matrix,
   semantic no-op detection, and missing-metric honesty partially
   authoritative. Those concepts should be strengthened, not duplicated.
2. SDE v0.1 lacks an explicit structural-locality doctrine, repository
   semantic-map contract, feature-manifest contract, local-first navigation
   protocol, context-escalation contract, context-surface metrics, greenfield
   path in the construction method, and defect taxonomy.
3. The current fixed ordering begins at semantic authority without first
   locating the responsible feature. The notes reveal a real ambiguity:
   local-first discovery must precede authority modification, while broad
   exploratory search should still follow available local and mechanical
   guidance.
4. The current `sde verify` command checks only installed-package integrity.
   It does not inspect application structure. Physical line count can be
   measured reliably as a warning; the proposed `SDE-STRUCT-002` through
   `004` findings cannot yet be inferred reliably from language-neutral text.
5. The approximately 7,000-line Bolero/Elmish case appears in the committed
   notes as an architectural observation. The existing accepted evidence
   records establish the surrounding HelixNote layers and Experiment 3
   limits, but do not independently preserve a measured line count. It will
   therefore be cited as a note-derived architectural finding, not promoted
   into a universal or independently replicated law.

## Hypotheses considered

- `HY-SDE-2026-0007`: semantically bounded structural organization reduces
  context acquisition and regression risk relative to an equivalent
  centralized state implementation. Proposed; not yet experimentally tested.
- `HY-SDE-2026-0008`: deterministic semantic maps and feature manifests reduce
  discovery expansion and repository-wide search for routine changes.
  Proposed; not yet experimentally tested.
- Alternative: ordinary repository search plus current v0.1 guidance is
  sufficient. The notes provide concrete failure rationale, but no controlled
  comparison yet falsifies this alternative across repositories.

## Decision made

Adopted SDE/method v0.2 as a versioned, portable expansion that:

- makes bounded reasoning scope an explicit design objective but keeps its
  cost/correctness benefit provisional;
- separates semantic area, semantic authority, responsibility cluster, and
  physical file;
- defines simple Markdown semantic-map and feature-manifest contracts;
- reconciles local-first navigation with mechanical-first propagation;
- adds explicit context escalation, defect taxonomy, telemetry checkpoints,
  and diagnostic context metrics;
- adds only the reliable `SDE-STRUCT-001` LOC warning now; and
- preserves v0.1 and every accepted experiment/evidence record unchanged.

## Telemetry checkpoints

### T0 — work-item start (`2026-09-05T18:45:43.180Z`)

| Metric | Value | Evidence class / limitation |
|---|---|---|
| Agent | OpenAI Codex | Runtime identity; exact model/provider ID not exposed to repository tools |
| Task | WI-0026 | ROS authoritative state |
| Classification | Research, with synthesis/documentation/engineering phases | ROS type + task analysis |
| Input/output/cache tokens | NOT OBSERVABLE | No authoritative runtime usage API exposed |
| Cost | NOT OBSERVABLE | No authoritative runtime billing API exposed |
| Tool calls | NOT OBSERVABLE authoritatively | The repository has no harness counter |
| Start timestamp | 2026-09-05T18:45:43.180Z | ROS event |
| Starting commit | `d1b8d8f39b9b3bdc6bbde842b29a1f5b16301e95` | Git |
| Starting user-content dirty paths | 0 | Git status before ROS work-state mutation |

### T1 — discovery/instrumentation baseline (`2026-09-05T18:50:59Z`)

| Metric | Value | Evidence class / limitation |
|---|---|---|
| Files inspected before first methodology edit | at least 88 | Contemporaneous SELF-REPORT from tool transcript; includes partial reads where command output was truncated, so not promoted as harness telemetry |
| Repository-wide file-list/search operations | 3 | Contemporaneous SELF-REPORT: two file inventories and one broad textual contradiction/version search |
| Symbol searches | 0 | Contemporaneous SELF-REPORT |
| Builds/tests attempted | 0 / 0 | No implementation existed yet |
| Failed builds/tests | 0 / 0 | No implementation existed yet |
| Repair loops | 0 | No implementation existed yet |
| Files changed before journal creation | 4 ROS work-state files | Git status; methodology/content files remained unchanged |
| Elapsed from ROS start | 5m 15.82s | Difference between ROS T0 and system UTC timestamp; includes discovery and recording setup |

### T2 — semantic foundation established (event time not separately captured)

| Metric | Value | Evidence class / limitation |
|---|---|---|
| New evidence records | 1 (`EV-SDE-2026-0006`) | Repository record |
| New hypotheses | 2 (`HY-SDE-2026-0007`, `0008`) | Repository records; both unresolved, Low |
| New theories | 1 (`TH-SDE-2026-0005`) | Candidate, Medium (0.50) |
| New decisions | 1 (`DF-SDE-2026-0004`) | Accepted Decision Record |
| Frozen records modified | 0 | Git diff plus SHA-256 comparison |
| Builds/tests attempted at this checkpoint | 0 / 0 | Implementation not yet complete |

The individual event timestamp was not captured contemporaneously by a
harness. It is intentionally left missing rather than reconstructed from file
mtimes.

### T3 — first vertical execution-package slice (event time not separately captured)

The first method/template/distribution slice built an 18-file execution
package carrying method v0.2. Its then-current `npm test` run passed all 28
tests. A later manual repository scan exposed that the initial source-extension
set omitted `.mjs` and `.sh`; therefore the first green result was not treated
as sufficient structural-verifier coverage. Exact event time and runtime
tokens/cost were not captured.

### T4 — implementation complete (event time not separately captured)

Canonical doctrine/method, templates, distribution code/tests/documentation,
repository map/context, and research records were integrated. The verifier
extension was repaired to include Node module and shell files, reject unknown
configuration fields, distinguish configuration from source-inspection
failures, and relocate canonical Markdown links when distribution paths move.
No exact implementation-complete timestamp was captured; T5 supplies the first
durable post-implementation timestamp.

### T5 — verification complete (`2026-09-05T20:38:58Z`)

| Metric | Cumulative result | Evidence class / limitation |
|---|---|---|
| `npm test` command invocations | 3 passed, 0 failed | Tool output; each includes a deterministic build |
| Final test suite | 30 passed, 0 failed, about 508 ms | Tool output |
| Build attempts | 3 passed, 0 failed | `pretest` output from the three suite invocations |
| Package dry-run attempts | 3 total: 2 passed, 1 environment failure | First default-cache attempt failed on root-owned external npm cache; isolated-cache retries passed |
| Managed distribution files | 18 | Build/manifest output |
| Package contents | 38 files, package v1.1.0 | Successful `npm pack --dry-run` output |
| Changed-source Markdown link check | 39 files, 0 missing targets | Local deterministic checker |
| Built-distribution Markdown link check | 17 files, 0 missing targets | Local deterministic checker |
| Structural review | 25 source files; 1 warning | Default scanner; physical lines only |
| Frozen artifact check | all 11 baseline entries passed | SHA-256 completion comparison |
| ROS registry / validation | current; valid with 0 findings | `./ros registry check`; `./ros validate --json` while WI-0026 active |
| Input/output/cache tokens, cost, authoritative tool-call total | NOT OBSERVABLE | No authoritative runtime counter exposed |

### T6 — final evidence and handoff ready (`2026-09-05T20:41:17Z`)

- Canonical REP, journal, current state, and handoff contain the decision,
  evidence boundaries, changed surfaces, validation, defects, risks, and next
  action.
- 57 repository paths are modified/new at record finalization: 42 tracked
  modifications and 15 new files. This includes generated ROS state and six
  generated registries, not 57 hand-authored methodology documents.
- `WI-0019` remains ready and unstarted. `WI-0027` is captured as a separate
  low-priority structural review.
- The ROS completion transition and final post-transition validation are the
  remaining mechanical actions; their authoritative result belongs to ROS
  state and the user-facing completion report rather than a retroactive
  journal edit.

## Files changed

- **ROS/generated:** four `.ros/` work-state files and six generated
  `registries/*.json` views.
- **Repository routing/state:** `README.md`, `PROJECT-CHARTER.md`,
  `HANDOFF.md`, and five `context/` records.
- **Research:** chronology plus one new evidence record, two hypotheses, one
  theory, one decision, this journal, and `RP-SDE-2026-0002`.
- **Doctrine:** six revised records and new `STRUCTURAL-LOCALITY.md`.
- **Method:** five revised records and new Construction Method v0.2,
  Navigation and Context Discovery, and Feature Manifests.
- **Templates:** three revised execution/trial reports plus new semantic-map
  and feature-manifest templates.
- **Distribution:** map, package/readme/authored content, build/link rewrite,
  verifier command, new structural scanner, and tests.

Source notes, the v0.1 Construction Method, accepted HelixNote evidence, and
the prior journal/REP are not in the changed set.

## Defects and repair loops

1. **Methodology/evidence:** the roadmap mentions a greenfield SDE trial but
   provides no accepted experiment record and conflicts with canonical state.
   Resolution: preserve the source statement, exclude the result, and make the
   gap explicit in evidence, method, state, and handoff.
2. **Repository/Automation:** the initial structural source-extension set
   omitted `.mjs` and `.sh`, producing a false zero-finding result on this
   repository despite a passing suite. Resolution: add the extensions and a
   regression test; the scan now reports `tools/ros_cli.mjs` at 1,085 lines.
3. **Repository/Automation:** canonical relative Markdown links would break
   when mapped from `doctrine/`/`method/` into different installed
   directories. Resolution: deterministic build-time relocation plus a test.
4. **Tooling/Build environment:** the first package dry-run failed because the
   user's default npm cache contains root-owned files. Resolution: rerun with
   an isolated `/tmp` cache; no repository change or elevated permission was
   needed.

One implementation repair loop changed product code (the extension-coverage
repair). The npm-cache retry was an environment validation retry, not a source
repair. No compiler/test failure drove a code repair.

## Adversarial review conclusions

- **Claim laundering:** prevented by separating constitutive contracts from
  predicted outcomes in the evidence map and charter.
- **Authority duplication:** maps/manifests explicitly route to authority and
  this repository reuses `context/ARCHITECTURE.md` rather than adding a second
  map.
- **Search-rule conflict:** local-first discovery and mechanical-first
  propagation are assigned to different phases with explicit escalation.
- **False verifier confidence:** only physical LOC is automated; findings are
  warnings; semantic checks remain named as deferred/manual.
- **Version confusion:** method v0.2, package v1.1.0, and manifest schema remain
  separate. V0.1 stays frozen.
- **Historical mutation:** checksum and Git checks show none.
- **Portability:** the scanner is dependency-free, configurable, and covers a
  broad language extension set; no language-specific semantic claim is made.

## Highest-value next step

Scope and execute `WI-0019` with a frozen non-HelixNote requirement and exact
method/package association. Pre-register T0–T6 and, if feasible, a paired
manifest/no-manifest condition. Treat `WI-0027` as independent and
non-blocking.
