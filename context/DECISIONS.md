# State Directed Engineering decisions

Material decisions use `DF-` records under `research/decisions/`. This
compact table is a navigation view, not a replacement for those records.

| Date | Decision | Status | Rationale | Record |
|---|---|---|---|---|
| 2026-09-02 | Use ROS 1.2.1-main.16.1 as a measured greenfield pilot. | provisional | Test portability and operational value on a real beginning project. | Not yet promoted to a `DF-` record |
| 2026-09-02 | Adopt State-Directed Engineering as a name and concept distinct from State Programming. | accepted | Separates paradigm claims from methodology claims so one can be revised without relitigating the other. | `research/decisions/DF-SDE-2026-0001` |
| 2026-09-02 | Treat corrected Experiment 3 (commit `8ac05fd`) as authoritative over any earlier draft or unlocated transition artifact. | accepted | Ensures SDE cites the corrected figures (76 log entries, incomplete Condition B telemetry, 4.0 BCA third replication), not a superseded or unlocated summary. | `research/decisions/DF-SDE-2026-0002` |
| 2026-09-02 | Defer solving the 4.0 Boundary Change Amplification finding during this migration. | accepted | Avoid conflating architecture change with methodology bootstrap, per the migration mission's explicit instruction. | `research/decisions/DF-SDE-2026-0003` |
