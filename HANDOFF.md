# State Directed Engineering handoff

## Objective

Bootstrap State-Directed Engineering (SDE) from HelixNote's State
Programming research, as a Repository Operating System pilot. **Complete**
as of 2026-09-02 — see `research/packages/RP-SDE-2026-0001--state-programming-to-sde-migration.md`
for the full record.

## Current state

- ROS 1.2.1-main.16.1 greenfield profile installed on 2026-09-02.
- SDE v0.1 doctrine, method, and evidence bootstrapped from HelixNote's
  Four-Tier/Boundary Preservation research and Controlled Experiments 1-3
  (corrected Experiment 3, commit `8ac05fd`, authoritative).
- Project charter updated (v0.2.0) to reflect the actual SDE domain.
- No first non-HelixNote engineering validation has run yet — designed in
  `method/FIRST-VALIDATION-DESIGN.md`, not executed.
- The operating system is still under evaluation (see `README.md`'s
  "Pilot rule" — this migration's own process is itself part of that
  evaluation, not exempt from it).

## Validation

Run:

```bash
./ros registry check
./ros validate
./ros status
```

## Unresolved questions

1. Does SDE's Construction Method, followed end to end, reduce real
   engineering cost on a project other than HelixNote?
2. Does mechanical boundary hardening reduce AI-agent token/wall-clock
   cost? (Open — Experiment 3's own telemetry for this is incomplete.)
3. Does the Four-Tier/Boundary-Preservation model transfer outside
   F#/.NET?
4. What data, privacy, safety, and accessibility constraints apply to
   whichever project runs the first engineering validation?

## Next action

Begin the first engineering validation: select a non-HelixNote project and
a frozen requirement per `method/FIRST-VALIDATION-DESIGN.md`, open a new
ROS work item for its execution (WI-0018 covers the design only), and
record its baseline before implementation begins.
