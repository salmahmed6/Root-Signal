# Root Signal

**Root Signal** is a reproducible benchmark for evaluating whether AI models can investigate, diagnose, repair, and verify realistic production software incidents.

It compares two execution modes:

- **Patch mode:** a model receives an incident report and repository snapshot, then returns a unified diff plus a structured diagnosis.
- **Agent mode:** a model uses a standardized, restricted toolset to inspect files, search code, inspect incident logs, run approved commands and tests, and apply patches.

The benchmark targets six synthetic production incidents across TypeScript/Node.js, Python/FastAPI, and Go.

## Research question

Can AI models reliably diagnose, repair, and verify production backend failures—and does controlled tool access improve outcomes compared with patch-only execution?

## Planned study

- 6 incident tasks
- 3 language ecosystems
- 2 execution modes
- 3 model identifiers selected and frozen before the main experiment
- 3 independent repetitions per task/model/mode condition
- **108 planned main-study runs** (6 × 3 × 2 × 3)

The 108 runs are a planned exploratory study, not completed experiments or results. A pilot will validate task determinism, budgets, grader behavior, and runtime before the main study. If the pilot requires changes, the protocol and run count will be updated before main-study data collection.

## Planned incidents

1. RS-01 — Authentication regression — TypeScript/Node.js
2. RS-02 — Duplicate payment processing — Python/FastAPI
3. RS-03 — Inventory race condition — Go
4. RS-04 — Cross-tenant cache leakage — TypeScript/Node.js
5. RS-05 — Retry amplification — Python/FastAPI
6. RS-06 — Graceful shutdown data loss — Go

## Research and implementation documents

- [Research methodology](docs/RESEARCH_METHODOLOGY.md)
- [Evaluation protocol](docs/EVALUATION_PROTOCOL.md)
- [Task specifications](docs/TASK_SPECIFICATIONS.md)
- [Data collection and run schema](docs/DATA_COLLECTION.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Limitations](docs/LIMITATIONS.md)

## Project status

Research specification and repository foundation phase. The 108-run study is planned only. Task fixtures, reference repairs, graders, sandbox controls, model runs, and results must not be described as complete until implemented and verified. The authentication regression pilot is the first task implementation milestone.

## Security

Never commit API keys, credentials, production data, private customer information, or unredacted logs. See [SECURITY.md](SECURITY.md).

## License

The project license will be finalized before the first public benchmark release.
