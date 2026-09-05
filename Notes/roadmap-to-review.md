State-Directed Engineering (SDE) v0.2

Experiment-Driven Methodology Revisions

Status: Proposed methodology revision
Basis: State Programming Experiments 1–3 and SDE Engineering Trial 1 — Greenfield Construction
Purpose: Convert repeated experimental findings and observed engineering friction into explicit improvements to the State-Directed Engineering methodology.

⸻

1. Why SDE Is Changing

The initial State Programming experiments focused heavily on whether explicit state, legal transitions, exhaustiveness, boundary preservation, and mechanical enforcement could reduce the amount of inference required to safely modify software.

The evidence has refined that hypothesis.

SDE should not be defined as an attempt to make every software obligation compiler-directed.

Instead:

State-Directed Engineering is a construction discipline that preserves semantic information about legal state and legal change, assigns each class of engineering obligation to the earliest reliable enforcement mechanism capable of knowing it, and structures human and agent work so that those mechanisms guide implementation before broad search and inference are required.

The experiments also reveal a broader engineering objective:

SDE should bound the reasoning scope required to safely understand and change software for both humans and machines.

This revision incorporates that finding.

⸻

2. Human-Scale Structural Decomposition

Finding

Semantic cohesion alone is not sufficient to produce maintainable software.

A semantic area can be correctly grouped while still becoming physically unmanageable.

A source file containing thousands of lines may technically preserve semantic locality while becoming difficult for humans to navigate, review, understand, and modify.

Conversely, aggressively splitting every type or function into separate files can destroy locality and create unnecessary navigation.

SDE therefore needs to distinguish:

1. semantic locality;
2. semantic authority;
3. responsibility grouping;
4. physical source organization.

Principle

Semantic boundaries determine what belongs together. Human-scale boundaries determine how a cohesive semantic area is physically decomposed.

A semantic boundary MUST NOT be interpreted as requiring a single physical source file.

Physical decomposition MUST NOT create independent copies of semantic authority merely to reduce file size.

Structural hierarchy

SDE should reason approximately as:

System
    ↓
Semantic Area
    ↓
Semantic Authority
    ↓
Responsibility Cluster
    ↓
Physical Module / File

A responsibility cluster is a coherent sub-area within a semantic authority.

Examples may include:

TimeEntry/
    Types
    Rules
    Transitions
    Capabilities
    Validation
    Diagnostics
    Projections

These are not automatically separate domains or authorities.

They are human-scale physical decompositions of a cohesive semantic area.

Anti-patterns

SDE should reject both extremes.

Tiny-file fragmentation

TimeEntry.fs
TimeEntryId.fs
TimeEntryStatus.fs
TimeEntryDescription.fs
TimeEntryValidator.fs
TimeEntryHelper.fs
TimeEntryFormatter.fs
...

This may technically produce small files while scattering one concept across excessive navigation boundaries.

Semantic mega-file

TimeEntry.fs
    7,000 lines

This preserves locality physically but exceeds reasonable human reasoning scope.

Source-size guidance

Line count should be treated as a structural review trigger rather than an absolute semantic rule.

Provisional guidance:

< 500 LOC
Normally no size concern.
500–1,000 LOC
Review for emerging responsibility clusters.
1,000–2,000 LOC
Strong presumption that decomposition should be considered.
> 2,000 LOC
Explicit structural justification should normally be required.
> 4,000 LOC
Normally an SDE structural conformance problem unless exceptionally justified.

These thresholds SHOULD eventually be configurable by language and environment.

File size alone MUST NOT determine decomposition.

Additional decomposition signals

Review a source unit when:

* multiple independently understandable responsibilities exist;
* clusters of functions interact weakly with each other;
* navigation regions are necessary merely to find behavior;
* unrelated transition families coexist;
* unrelated semantic concepts accumulate;
* merge contention becomes frequent;
* authoritative behavior becomes difficult to locate;
* humans require excessive scrolling/searching;
* agents repeatedly search within the same large source unit;
* changes routinely touch unrelated portions of the file.

Core constraint

Never split merely to satisfy a line-count target. Never retain a monolithic source unit merely to preserve semantic locality.

⸻

3. Optimize for Human and Machine Reasoning

SDE has deliberately made systems more machine-legible through:

* explicit states;
* explicit transitions;
* capabilities;
* guards;
* evidence;
* obligations;
* explicit effects;
* explicit uncertainty.

That optimization MUST NOT make systems unnecessarily difficult for humans.

New principle:

SDE implementations should be simultaneously semantically explicit for machines and cognitively navigable for humans.

This implies that SDE architecture should seek bounded reasoning scope for both.

A 7,000-line source file can impose excessive reasoning scope on a human just as unrestricted repository-wide search imposes excessive reasoning scope on an agent.

⸻

4. Mechanical Guidance Before Broad Search

Finding

Experiment 3 demonstrated that useful mechanical guidance can exist without actually guiding agent behavior.

An agent can search ahead, inspect implementation details, and manually discover obligations before allowing the architecture to expose them.

This reduces the practical benefit of mechanical enforcement.

Revised execution rule

For semantic changes, the preferred SDE sequence is:

1. Understand and classify the requirement/change.
2. Identify the authoritative semantic representation.
3. Change the authority first.
4. Compile.
5. Repair compiler-directed obligations.
6. Run architecture checks.
7. Repair architecture-directed obligations.
8. Run boundary/contract checks.
9. Repair boundary obligations.
10. Run focused behavioral tests.
11. Only then perform targeted manual search.
12. Perform integration verification.
13. Perform representative live verification when warranted.
14. Stop when acceptance and required verification are satisfied.

Broad repository search SHOULD NOT normally precede available authoritative and mechanical feedback.

Search remains legitimate.

The goal is not to eliminate search.

The goal is to make search targeted rather than exploratory whenever practical.

⸻

5. Detection Optimization vs. Construction Optimization

Experiments repeatedly demonstrated that making obligations visible does not necessarily reduce the number of representations that must change.

Boundary Change Amplification repeatedly measured approximately:

4.0 boundary files per semantic decision

across multiple experiments.

SDE therefore needs to distinguish two different engineering objectives.

Detection optimization

Make required changes fail visibly and as early as practical.

Construction optimization

Reduce or derive the number of independently maintained representations required for one semantic decision.

New principle:

SDE SHOULD minimize independently maintained representations of a semantic decision, not merely make disagreement between them detectable.

This does NOT imply that all boundary representations should immediately be generated.

The persistent boundary propagation cost should remain an explicit engineering target until further evidence determines the appropriate solution.

⸻

6. Failure-Detection Responsibility Matrix

SDE should stop treating compiler enforcement as the universal ideal.

Different defect classes are knowable at different layers.

The methodology should explicitly assign responsibility.

Missing semantic case
    → compiler / exhaustiveness
Architecture dependency violation
    → architecture check
Missing or inconsistent boundary representation
    → contract / agreement check
Present-but-wrong implementation
    → behavioral / integration test
External or untyped mismatch
    → runtime validation
Unknown external outcome
    → explicit uncertainty + reconciliation

Core principle:

Every engineering obligation should become mechanically visible at the earliest trustworthy layer capable of knowing that the obligation exists.

The emphasis is on earliest trustworthy, not earliest theoretically possible.

⸻

7. Semantic No-Op as a First-Class Failure Class

Experiments demonstrated a repeatable defect pattern:

correct branch exists
correct case exists
code compiles
architecture passes
boundary contract agrees
implementation performs no meaningful semantic behavior

This is a semantic no-op.

Compiler exhaustiveness cannot reliably detect this class.

Architecture checks cannot reliably detect it.

Boundary agreement cannot reliably detect it.

Therefore SDE must explicitly recognize it.

New rule:

Every semantically meaningful transition or boundary behavior SHOULD have behavioral evidence proving its intended effect, not merely evidence that its structural case exists.

Behavioral verification owns the present-but-wrong class.

SDE should not attempt to force this responsibility into the compiler merely for theoretical purity.

⸻

8. Stronger Boundary Authority

Earlier experiments repeatedly exposed defects involving:

* duplicated routes;
* serialization behavior;
* SQL constraints;
* projection mappings;
* independently maintained strings;
* boundary vocabulary;
* public API representations.

SDE should therefore strengthen its boundary doctrine.

Rules

Wire contracts MUST be deliberate.

Wire representations MUST NOT depend on incidental serializer, framework, or host-language behavior.

Boundary vocabularies SHOULD have a single authoritative representation where practical.

Weakening of strong semantic representations SHOULD occur as late as practical.

Re-entry from weak/external representations into the semantic system MUST be validated.

SDE should continue to prefer established interoperability standards such as JSON Schema, OpenAPI, and Protobuf where appropriate.

Current evidence does NOT justify creating an SDE-specific DSL.

⸻

9. Greenfield Construction Method

Most early SDE research studied changes to existing software.

SDE Engineering Trial 1 demonstrates that greenfield construction requires additional procedural guidance.

Questions include:

* How are initial semantic concepts discovered?
* When is the model sufficiently detailed?
* When should persistence be introduced?
* When should UI/host construction begin?
* How much architecture should precede executable behavior?
* How should requirements become vertical slices?

SDE should therefore add an explicit greenfield construction path.

Recommended shape:

Requirements
    ↓
Identify domain concepts
    ↓
Identify important legal state
    ↓
Identify legal transitions
    ↓
Establish invariants / guards
    ↓
Construct first meaningful vertical semantic slice
    ↓
Introduce required host / persistence boundaries
    ↓
Verify end-to-end behavior
    ↓
Expand capability-by-capability

SDE MUST NOT interpret semantic modeling as permission for unlimited up-front design.

Prefer the smallest semantic model sufficient to support the next meaningful vertical behavior.

⸻

10. Defect Classification

The greenfield trial demonstrated that “zero product defects” does not mean “zero engineering failures.”

SDE should distinguish failure categories.

Proposed categories:

DOMAIN / PRODUCT DEFECT
Incorrect externally observable business behavior.
SEMANTIC DEFECT
Incorrect state, transition, invariant, capability, obligation, or semantic rule.
BOUNDARY DEFECT
Incorrect representation or translation across architectural/system boundaries.
TOOLING / BUILD DEFECT
Compiler configuration, build tooling, dependency, command, or test-runner failure.
REPOSITORY / AUTOMATION DEFECT
Git hooks, workflows, repository automation, packaging, or related engineering-system behavior.
METHODOLOGY DEFECT
SDE guidance itself produces, permits, or fails to address an important recurring problem.
EXPERIMENT-HARNESS DEFECT
Instrumentation or experimental infrastructure produces incorrect/incomplete evidence.

Metrics should preserve these distinctions.

A statement such as:

Zero product defects

must not conceal tooling, automation, methodology, or experiment-harness failures.

⸻

11. Telemetry Must Be Contemporaneous

Experiment 3 demonstrated that agent self-report is insufficient for reliable cost analysis.

SDE Engineering Trial 1 further demonstrated that cumulative session telemetry may exist even when the agent initially assumes otherwise.

Future serious SDE experiments should capture external or authoritative telemetry at defined checkpoints.

Recommended checkpoints:

T0 — experiment start
T1 — instrumentation/bootstrap complete
T2 — semantic foundation established
T3 — first vertical slice complete
T4 — implementation complete
T5 — verification complete
T6 — final completion

Capture where available:

* cumulative input tokens;
* cumulative output tokens;
* cached tokens;
* total tokens;
* cost;
* tool calls;
* elapsed time;
* searches;
* files inspected;
* build attempts;
* test attempts;
* failed commands;
* repair loops;
* manual discoveries.

Checkpoint deltas should be calculated from durable observations rather than agent recollection.

⸻

12. No Post-Hoc Metric Invention

The greenfield trial correctly left time-per-requirement and repair-time metrics empty because they had not been captured contemporaneously.

SDE research should formalize this behavior.

Rule:

If a metric was not captured contemporaneously and cannot be reconstructed from durable evidence, it MUST be reported as missing rather than estimated from memory.

Missing evidence is scientifically preferable to invented precision.

This applies particularly to:

* requirement-level cost;
* requirement-level token use;
* repair duration;
* reasoning-error timing;
* human intervention;
* search attribution.

⸻

13. Explicit Stop Conditions

Agents have a tendency to continue improving software after the requested engineering objective has been satisfied.

This creates unnecessary cost and makes experiments harder to compare.

SDE should establish explicit stop conditions.

A work item should normally stop when:

[ ] acceptance criteria are satisfied;
[ ] relevant compiler checks pass;
[ ] architecture checks pass;
[ ] boundary checks pass;
[ ] required behavioral tests pass;
[ ] required integration verification passes;
[ ] representative live verification passes when warranted;
[ ] no known blocking defects remain;
[ ] required evidence has been recorded.

Do not continue refactoring merely because further improvement is possible.

Additional improvements should become separate work.

⸻

14. One Semantic Decision → Derived Consequences

One of the strongest patterns observed in the greenfield trial was a business rule enforced through a common semantic mechanism rather than independently remembered at multiple locations.

For example, guards can potentially drive both:

validation
and
capability derivation

This is desirable.

SDE should deliberately seek architectures in which one semantic decision drives multiple consequences.

Potential derived consequences include:

semantic legality
validation
capability derivation
available UI actions
transition execution
diagnostics
contract assertions
tests

New principle:

Make each semantic decision authoritative once and derive as many downstream consequences from that authority as practical.

This is stronger than merely detecting duplication.

It reduces the number of independent opportunities for semantic drift.

⸻

15. Preserve Semantic Authority During Physical Decomposition

The structural-decomposition change introduces a new risk.

For example:

TimeEntry/
    Rules.fs
    Transitions.fs
    Capabilities.fs

must not result in each file independently implementing:

Is this operation legal?

Physical separation is organizational.

It does not authorize semantic duplication.

Rule:

Physical decomposition MUST NOT create independent semantic authorities.

When several responsibility clusters depend on the same rule, they should consume or derive from the authoritative semantic representation.

⸻

16. Structural Verification

Future sde verify capabilities should consider structural concentration.

Initial verification may use simple heuristics.

Examples:

SDE-STRUCT-001
Source unit exceeds recommended human-review threshold.
SDE-STRUCT-002
Source unit contains unusually high declaration concentration.
SDE-STRUCT-003
Source unit appears to span multiple responsibility categories.
SDE-STRUCT-004
Physical decomposition appears to duplicate semantic authority.

LOC thresholds SHOULD initially produce review warnings rather than blindly fail builds.

Potential future measurements include:

* largest source file;
* median source-file size;
* files >500 LOC;
* files >1,000 LOC;
* files >2,000 LOC;
* semantic areas;
* files per semantic area;
* declarations per file;
* dependency fan-in/fan-out;
* responsibility concentration;
* semantic duplication;
* change concentration.

A future Structural Concentration Score may be investigated, but it is not yet validated and MUST remain experimental.

⸻

17. SDE Engineering Metrics

Routine SDE engineering telemetry should increasingly include:

requirements completed
acceptance criteria completed
search operations
repair loops
manual discoveries
semantic decisions
boundary decisions
required change sites
files inspected
files changed
build attempts
failed builds
test attempts
failed tests
reasoning errors
first trustworthy detection stage
product defects
semantic defects
boundary defects
tooling defects
automation defects
largest source file
files over structural review thresholds
token usage
tool usage
cost
elapsed time

Research-specific metrics such as CDR, MDR, MaDR and BCA remain useful where appropriate but should not be forced into ordinary development work when they do not answer an engineering question.

⸻

18. Changes NOT Justified Yet

Current evidence does NOT justify making the following mandatory SDE doctrine:

A custom SDE DSL
Mandatory F#
Mandatory WASM
Mandatory TypeScript
Mandatory code generation
One class/type per file
Universal hard LOC limits
Complete elimination of boundary duplication
Compiler detection of every defect class

These may remain research topics.

SDE should not turn hypotheses into doctrine without evidence.

⸻

19. Revised SDE Engineering Objective

The accumulated evidence suggests a stronger engineering objective than the original compiler-centric framing.

Previous approximation:

more mechanical discovery
    ↓
less search
    ↓
less inference
    ↓
fewer repairs
    ↓
lower cost

Revised model:

explicit semantic authority
        +
bounded reasoning scope
        +
clear responsibility boundaries
        +
appropriate mechanical enforcement
        +
mechanical-first execution procedure
        ↓
more directed navigation
        ↓
less unnecessary inference/search
        ↓
earlier trustworthy failure detection
        ↓
fewer uncontrolled repair loops
        ↓
less opportunity for semantic drift
        ↓
potentially lower practical engineering effort

Cost reduction remains an empirical question.

SDE MUST NOT claim cost reduction until competent comparative experiments demonstrate it.

⸻

20. Revised Definition of SDE

Proposed definition:

State-Directed Engineering is a software-construction discipline that makes legal system state and evolution explicit, establishes authoritative semantic decisions, assigns engineering obligations to the earliest trustworthy enforcement mechanisms capable of knowing them, preserves those semantics across boundaries, and structures software and engineering work so that both humans and agents can operate within bounded reasoning scope.

State Programming remains the underlying architectural paradigm.

SDE remains the engineering method.

Therefore:

State Programming defines the constraints. State-Directed Engineering defines how humans and agents work effectively within those constraints.

⸻

21. Proposed SDE v0.2 Changes

The following changes are candidates for incorporation into the next SDE methodology version:

1. Human-scale structural decomposition
    * semantic areas may span multiple files;
    * responsibility clusters guide physical decomposition;
    * semantic authority remains singular.
2. Bounded reasoning scope
    * architecture should remain navigable for both humans and agents.
3. Mechanical-first execution order
    * authoritative change and mechanical feedback before broad search.
4. Detection vs. construction optimization
    * distinguish finding propagation obligations from reducing them.
5. Failure-detection responsibility matrix
    * assign each failure class to the earliest trustworthy mechanism.
6. Semantic no-op verification
    * present-but-wrong behavior requires behavioral evidence.
7. Stronger boundary-contract guidance
    * deliberate wire contracts, delayed weakening, validated re-entry.
8. Greenfield construction workflow
    * explicit requirement-to-semantic-slice construction guidance.
9. Defect classification
    * distinguish product, semantic, boundary, tooling, automation, methodology, and harness defects.
10. Mandatory experimental telemetry checkpoints
    * capture durable cumulative telemetry throughout serious trials.
11. No post-hoc metric invention
    * missing evidence remains explicitly missing.
12. Explicit stop conditions
    * stop once acceptance and required verification are complete.
13. One semantic decision → derived consequences
    * reduce independently maintained semantic representations.
14. Structural verification
    * detect excessive physical concentration without imposing arbitrary universal file-size laws.

⸻

22. Evidence Confidence

Not every proposed change has equal empirical support.

Strong evidence / suitable for methodology

* mechanical feedback should precede broad search;
* compiler enforcement is not sufficient for all defect classes;
* semantic no-ops require behavioral verification;
* boundaries require explicit authority and validation;
* agent self-reported cost is insufficient;
* missing telemetry must not be reconstructed from memory;
* detection improvement does not necessarily reduce construction propagation;
* product defects must be distinguished from tooling/engineering-system failures.

Strong engineering rationale with supporting observed evidence

* human-scale structural decomposition;
* bounded reasoning scope for humans and agents;
* explicit stop conditions;
* greenfield-specific construction guidance;
* deriving multiple consequences from one semantic authority.

These should be introduced and explicitly measured in subsequent trials.

Experimental / not yet doctrine

* exact LOC thresholds;
* Structural Concentration Score;
* automated semantic-duplication detection;
* generation as solution to boundary propagation;
* exact optimal module/file granularity.

⸻

23. Experimental Consequence

Changing SDE creates a new experimental treatment.

The existing greenfield result MUST remain associated with the exact SDE version that produced it.

Do not modify the original experimental baseline.

Recommended progression:

Original frozen baseline
        |
        +-— Original SDE Run 1  [completed]
        |
        +-— Original SDE replication
Revised frozen baseline
        |
        +-— Revised SDE Run 1
        |
        +-— Revised SDE replication

The requirements should remain identical wherever possible.

The revised baseline should differ only in explicitly recorded methodology/tooling changes.

This allows us to distinguish:

agent/run variance
from
methodology effects

⸻

24. Research-to-Engineering Feedback Loop

SDE should explicitly institutionalize the process now occurring:

engineering execution
        ↓
observed friction / defect / success
        ↓
durable evidence
        ↓
classify mechanism
        ↓
SDE gap or finding
        ↓
proposed methodology change
        ↓
versioned SDE revision
        ↓
controlled validation
        ↓
retain / revise / reject

This prevents SDE from becoming static doctrine.

It also prevents every individual project from modifying the methodology opportunistically.

Observed problems generate proposals.

Evidence promotes proposals into doctrine.

⸻

25. Central Principle Emerging From the Experiments

The experiments increasingly point toward a broader principle:

Correct software construction becomes easier when the amount of information that must be inferred at any one time is deliberately bounded.

State Programming bounds the legal semantic space.

Capabilities bound available actions.

Transitions bound legal evolution.

Evidence and guards bound authorization.

Obligations bound unresolved work.

Boundary contracts bound representations.

Mechanical checks bound where mistakes can hide.

Structural decomposition bounds human navigation.

SDE execution order bounds agent exploration.

Together, these mechanisms suggest that bounded reasoning scope may be one of the deeper unifying ideas behind State-Directed Engineering.

This should be treated as a theory refinement worthy of explicit future validation rather than immediately assumed to be proven.