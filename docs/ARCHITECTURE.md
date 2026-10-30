# Architecture

## Components

- **Orchestrator:** schedules task/model/mode runs and enforces budgets.
- **Provider adapters:** normalize model requests and responses; OpenRouter is the initial provider.
- **Patch executor:** validates and applies unified diffs.
- **Agent runtime:** exposes standardized tools and validates every tool call.
- **Sandbox manager:** provisions isolated task containers.
- **Independent grader:** runs hidden tests and computes scores outside the model workspace.
- **Recorder:** stores raw outputs, tool traces, timings, token usage, and metadata.
- **Reporter:** produces JSON and Markdown summaries.

## Agent tools

- `list_files`
- `read_file`
- `search_code`
- `inspect_logs`
- `run_tests`
- `run_command` (allowlisted only)
- `apply_patch`
- `get_test_results`

## Security boundaries

Evaluated code is untrusted. Task containers must not be privileged, must not receive host credentials or Docker socket access, and should have network disabled by default. Enforce resource and time limits. Hidden tests and reference solutions must remain outside the agent workspace.

## Data flow

Orchestrator → Provider adapter → Patch or agent mode → isolated task workspace → independent grader → experiment recorder → report generator.

## Repository layout

- `benchmark/`: model-facing task fixtures and task manifests.
- `src/`: orchestration, providers, agent tools, sandbox, grading, recording.
- `experiments/`: configurations and generated results.
- `docs/`: research and engineering documentation.
- `tests/`: unit and integration tests for the benchmark infrastructure.
