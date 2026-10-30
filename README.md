# Root Signal

**Root Signal** is a reproducible benchmark for evaluating whether AI models can investigate, diagnose, repair, and verify realistic production software incidents.

It compares two execution modes:

- **Patch mode:** a model receives an incident and repository snapshot, then returns a unified diff.
- **Agent mode:** a model uses a standardized, restricted toolset to inspect files, search code, inspect incident logs, run approved commands and tests, and apply patches.

The initial benchmark targets six incidents across TypeScript/Node.js, Python/FastAPI, and Go.

## Research question

Can AI models reliably diagnose, repair, and verify production backend failures—and does controlled tool access improve outcomes compared with patch-only execution?

## Initial scope

- 6 production incidents
- 3 language ecosystems
- 2 evaluation modes
- 3 models in the initial experiment
- 36 initial model/task/mode runs

The initial experiment is exploratory. Results must include raw outputs, exact model identifiers, run metadata, grader versions, and limitations. No scores or findings will be fabricated.

## Planned incidents

1. Authentication regression — TypeScript/Node.js
2. Duplicate payment processing — Python/FastAPI
3. Inventory race condition — Go
4. Cross-tenant cache leakage — TypeScript/Node.js
5. Retry amplification — Python/FastAPI
6. Graceful shutdown data loss — Go

## Repository layout

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), [docs/RESEARCH_METHODOLOGY.md](docs/RESEARCH_METHODOLOGY.md), and [docs/TASK_SPECIFICATIONS.md](docs/TASK_SPECIFICATIONS.md).

## Project status

Research and foundation phase. The authentication regression pilot is the first implementation milestone. No benchmark results should be considered valid until task defects, reference fixes, graders, and isolation controls have been independently validated.

## Security

Never commit API keys, credentials, production data, private customer information, or unredacted logs. See [SECURITY.md](SECURITY.md).

## License

The project license will be finalized before the first public benchmark release.
