# @echelon-foundry/sde

Installs a small, versioned, agent-readable **SDE execution package**
(`.sde/`) into any software repository — the subset of State-Directed
Engineering doctrine and method a project needs to *apply* SDE, not the
full research archive that justifies it.

```
npx @echelon-foundry/sde init
npx @echelon-foundry/sde status
npx @echelon-foundry/sde verify
npx @echelon-foundry/sde update
```

## What this is, and is not

This package is a **distribution mechanism**, not the methodology itself
and not a work-management tool.

- The canonical SDE methodology (doctrine, method, evidence, research)
  lives in the [`state-directed-engineering`](https://github.com/kemiller2002/state-directed-engineering)
  repository, under `doctrine/`, `method/`, and `research/`. That is the
  authoritative source for *why* SDE's rules exist.
- This package installs a **curated, versioned subset** of that
  methodology — the "execution package" — into `.sde/` in a consuming
  repository, for engineers and agents who need to *apply* SDE to real
  work without reading the research that produced it.
- **This package does not depend on, require, wrap, or modify
  ROS** (the Repository Operating System also present in the canonical
  SDE repository). ROS manages work items and research-artifact lifecycle
  in the canonical repository; SDE is an engineering methodology. Neither
  requires the other. A project may use `.sde/` with no `.ros/` present at
  all, or vice versa.

## Why `.sde/` exists

An engineering agent working on an ordinary project should not need to
clone the SDE research repository, understand ROS's work-item protocol, or
read three controlled experiments' worth of evidence before making a
change. `.sde/` exists to answer, from inside the consuming repository
alone: what methodology does this project use, what document to read
first, how to classify a change, in what order to implement and verify it,
and which version of SDE is installed.

## What gets installed

```
.sde/
├── README.md              orientation for humans and agents
├── VERSION                the installed SDE package version, e.g. "0.1.0"
├── MANIFEST.json           installation manifest: version, source
│                           revision, and a sha256 per managed file
├── method/
│   ├── CONSTRUCTION-METHOD.md
│   ├── CHANGE-CLASSIFICATION.md
│   ├── VERIFICATION-METHOD.md
│   └── AGENT-EXECUTION-RULES.md
├── architecture/
│   ├── FOUR-TIER-ARCHITECTURE.md
│   └── BOUNDARY-PRESERVATION.md
├── reference/
│   ├── GLOSSARY.md
│   └── ENGINEERING-METRICS.md
└── templates/
    ├── work-item.md
    ├── execution-log.md
    └── completion-report.md
```

## What does not get installed

Deliberately excluded: `research/`, evidence records, experiment reports,
research journals, REP archives, migration artifacts, and internal
methodology-maintenance material (the Evidence-to-Engineering Map, the
Contradictions register, and similar documents whose audience is SDE's own
maintainers, not an engineering agent applying it to a project). The
canonical repository remains the source for provenance; this package
exists to apply SDE, not to prove it.

See `DISTRIBUTION-MAP.json` for the exact, machine-readable, version-
controlled mapping from canonical source documents to installed files. One
installed file (`templates/work-item.md`) has no canonical source — the
canonical repository deliberately leaves work-item format to ROS, which a
consuming project may not have, so a minimal generic template is authored
directly for distribution (`authored/work-item.md`, flagged as such in the
mapping).

## How `init` works

`init` copies the version of the execution package bundled with the
installed `@echelon-foundry/sde` release into `.sde/` in the current
directory. It is safe to run more than once:

| Existing `.sde/` state | `init` behavior |
|---|---|
| none | installs fresh |
| same version, unmodified | reports "already installed and verified", no writes |
| same version, modified | refuses, reports which files changed |
| older version, unmodified | reports that an update is available; does not upgrade (use `update`) |
| older version, modified | refuses, reports which files changed |
| newer version than this CLI | warns; refuses to downgrade |

Installation is atomic: the new package is copied into a temporary sibling
directory and independently re-verified against its own manifest *before*
anything under `.sde/` is replaced, so a failure mid-install never leaves
`.sde/` partially written.

## How version pinning works

A project's `.sde/` installation is pinned to whatever version `init` (or
the last `update`) installed. There is no background or automatic update
of any kind — no network polling, no telemetry. The methodology only
changes when a human deliberately runs `update`.

Three version concepts are tracked independently, since they do not
necessarily move together:

- **npm package version** (`package.json` `version`, e.g. `0.1.0`) — this
  CLI's own release.
- **method version** (`MANIFEST.json` `methodVersion`, e.g. `0.1`) — the
  construction method's own version, read from its canonical document's
  front matter at build time. A package release that fixes an installer
  bug without changing methodology content bumps the package version
  without bumping the method version.
- **manifest schema version** (`MANIFEST.json` `schemaVersion`) — the
  shape of `MANIFEST.json` itself.

## How `status` works

Reports the installed version, the version bundled with the running CLI,
the canonical source revision (a git commit SHA) recorded at build time,
and integrity (verified / modified), without changing anything. Exits `0`
when installed and verified, non-zero otherwise (not installed, or
modified) — see [`sde-status.exit-codes`](#exit-codes) below.

## How `verify` works

Recomputes a SHA-256 for every file `MANIFEST.json` declares and compares
it against the recorded hash; also detects files the manifest declares but
that are missing, and files present under `.sde/` that the manifest does
not declare. Never mutates anything. Suitable for CI:

```
npx @echelon-foundry/sde verify
```

## How `update` works

Deliberately upgrades an existing installation to the version bundled with
the invoked CLI. **Never** overwrites an installation with local
modifications — it fails safely and reports exactly which files were
modified, so nothing is silently lost. If there is nothing newer to
install, or the installed version is already newer than the CLI's own
package, `update` says so and makes no changes.

## How local-modification detection works

Files under `.sde/` are versioned methodology inputs and should not be
edited directly. `status` and `verify` detect a modification by comparing
each managed file's current SHA-256 against the hash recorded in
`MANIFEST.json` at install time — they report modifications; they never
repair them. If a project genuinely needs to deviate from installed SDE
guidance, that deviation should be recorded outside `.sde/` (a full
deviation-tracking mechanism is future work — see the canonical
repository's method documents for the current state of that question).

## How releases are produced

```
canonical doctrine/method documents (state-directed-engineering repo)
        │
        │  distribution/DISTRIBUTION-MAP.json (version-controlled mapping)
        ▼
  npm run build   (distribution/src/build.mjs)
        │
        │  deterministic copy + SHA-256 + MANIFEST.json + VERSION
        ▼
  distribution/dist/   (generated; never committed; never hand-edited)
        │
        │  npm publish (ships dist/ inside the package)
        ▼
  @echelon-foundry/sde on npm
        │
        │  npx @echelon-foundry/sde init
        ▼
  .sde/ in a consuming repository
```

`npm run build` fails loudly if a canonical source file the distribution
map names is missing — it never silently ships an incomplete package.
`MANIFEST.json`'s `sourceRevision` field records the canonical repository's
git commit SHA at build time, so any installed `.sde/` is traceable to the
exact canonical source that produced it. Building does not require git to
be present in a *consuming* project — only in the canonical repository at
package-build time.

A released package version is immutable: if canonical methodology changes
materially, that requires a new package version and a new build, not a
silent regeneration of an already-published version's contents. This
matters for reproducible engineering trials that cite a specific installed
SDE version.

## How this differs from ROS

| | ROS | SDE (`@echelon-foundry/sde`) |
|---|---|---|
| Manages | work items, research-artifact lifecycle | an engineering method to apply to changes |
| Lives in a consuming project as | `.ros/` (if the project adopts ROS) | `.sde/` (this package) |
| Required by the other? | No | No |
| Installed via | `ros-bootstrap init` (a separate mechanism, canonical-repo-specific) | `npx @echelon-foundry/sde init` |

**SDE does not depend on ROS.** **ROS is not modified, wrapped, or
extended by the SDE installer** — this package never reads, writes, or
imports anything under `.ros/`, `ros.json`, or `tools/ros_cli.mjs` in the
canonical repository, and does not assume a consuming project has ROS
installed at all.

## Exit codes

`verify` and `status`: `0` = verified/clean, non-zero = not installed,
unreadable, or modified. `init` and `update`: `0` = installed/updated (or
already correct and unmodified), non-zero = refused (modifications
present, malformed installation, or a downgrade was requested).

## Runtime footprint

Zero npm dependencies (runtime or development) — everything is built on
Node's own `fs`, `path`, `crypto`, `child_process`, and `node:test`. After
`.sde/` is installed, a consuming project's own runtime does not depend on
`@echelon-foundry/sde` at all; it is an engineering-time input, not a
production dependency, and is normally invoked through `npx` rather than
added to a project's own `package.json`.
