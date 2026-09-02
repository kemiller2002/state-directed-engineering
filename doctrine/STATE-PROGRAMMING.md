---
id: SDE-DOCTRINE-001
title: State Programming
status: accepted
version: 0.1.0
created: 2026-09-02
updated: 2026-09-02
related_documents:
  - doctrine/STATE-DIRECTED-ENGINEERING.md
  - doctrine/FOUR-TIER-ARCHITECTURE.md
  - doctrine/BOUNDARY-PRESERVATION.md
  - doctrine/GLOSSARY.md
supersedes: []
superseded_by: []
tags: [doctrine, state-programming, paradigm]
---

# State Programming

> State Programming defines the constraints. State-Directed Engineering
> defines how we work within them.

This document defines State Programming as a paradigm. It does not define
how to build software using it — that is
[`STATE-DIRECTED-ENGINEERING.md`](STATE-DIRECTED-ENGINEERING.md).

## What State Programming is

State Programming is a programming and architectural paradigm concerned
with making the legal evolution of a system's meaning explicit, so that a
change to that meaning is discoverable by mechanism rather than by
inference alone. Its central concepts:

- **Explicit semantic states** — what can be true is named, not inferred
  from a combination of flags or null checks.
- **Legal transitions** — what change may happen is a closed, checkable set,
  not an implicit consequence of arbitrary code paths.
- **Invariants** — properties that must hold across every reachable state.
- **Evidence** — the basis for believing a state is true, tracked
  explicitly rather than assumed.
- **Capabilities** — what an actor or state is permitted to do next.
- **Obligations** — what must still happen for a transition to be complete.
- **Effects** — externally-observable consequences, requested as data
  rather than performed directly by the code that decides them.
- **Uncertainty** — a first-class, explicit state (not silently mapped to
  `null`, an exception, or a default) for "we do not yet know the outcome."
- **Constrained legal evolution** — the system can only move between states
  in ways the model actually permits.
- **Boundary preservation** — semantic information does not degrade for
  free when it crosses a responsibility boundary (see
  [`BOUNDARY-PRESERVATION.md`](BOUNDARY-PRESERVATION.md)).
- **Mechanically discoverable change obligations** — when a semantic
  decision requires a corresponding change elsewhere, that requirement
  should be discoverable by a mechanism (compiler, architecture check,
  contract test), not solely by a human or agent remembering it.

## What State Programming is not

- It is not a specific language, framework, or serializer. See "Language
  Neutrality" below.
- It is not a claim that mechanical discovery eliminates the need for
  search, review, or testing — Experiment 3 [EV-HN-2026-0005] directly
  demonstrated that a present-but-inert implementation arm evades every
  mechanical check tried so far, on every architecture tried so far, and
  is caught only by integration testing and direct data inspection.
- It is not, by itself, an engineering methodology. How to analyze a
  requirement, classify a change, decide where to start, and know when to
  stop is State-Directed Engineering's job, not State Programming's.

## Language Neutrality

State Programming specifications must be defined independently of host
language, runtime, serializer, framework, or transport. F# provides strong
enforcement in the HelixNote research (via discriminated unions,
`netstandard2.0` dependency isolation, and `WarningsAsErrors=FS0025`
exhaustiveness), but F# does not define the semantics. Equivalent
implementations may use Rust enums, Kotlin sealed classes, Swift enums, Java
sealed types (Java 21+, verified directly in `EV-HN-2026-0002`'s BP-003
cross-language experiment), TypeScript discriminated unions, C# closed
record/type patterns, or other equivalent representations — with the
explicit caveat, evidenced directly rather than assumed, that **enforcement
strength varies by language** (F#/Rust/Java: hard compile errors;
TypeScript: real but idiom-dependent; C#: warning-only by default unless
`TreatWarningsAsErrors` is set). Distinguish **semantic conformance**
(does the model express the intended constraint?) from **enforcement
strength** (how hard is it, in this language, to violate the constraint
accidentally?) — both matter, but they are not the same axis, and a
doctrine document must never claim a language's syntax defines the paradigm.

## Relationship to the Four Tiers and Boundary Preservation

State Programming's constraints are organized architecturally by the Four
Tiers ([`FOUR-TIER-ARCHITECTURE.md`](FOUR-TIER-ARCHITECTURE.md)) and
protected across responsibility boundaries by Boundary Preservation
([`BOUNDARY-PRESERVATION.md`](BOUNDARY-PRESERVATION.md)). Neither of those
documents redefines State Programming; they operationalize it.

## Evidence status

This document states the paradigm as currently understood after three
controlled HelixNote experiments. See
[`doctrine/EVIDENCE-TO-ENGINEERING-MAP.md`](EVIDENCE-TO-ENGINEERING-MAP.md)
for which specific claims are supported, contradicted, or still open, and
[`doctrine/CONTRADICTIONS-AND-DEPRECATED.md`](CONTRADICTIONS-AND-DEPRECATED.md)
for ideas this research program has already tested and found wanting.
