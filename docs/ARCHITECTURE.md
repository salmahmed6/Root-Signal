# Architecture

This is the target architecture for implementation. Components listed here are planned unless separately verified in code and tests.

## Components

- **Experiment orchestrator:** schedules task/model/mode/repetition runs, applies frozen configuration, and enforces budgets.
- **Provider adapters:** normalize model requests/responses and capture exact provider/model identifiers and usage. OpenRouter is the initial planned provider adapter; provider choice must be frozen for the study.
- **Patch executor:** validates unified diffs, enforces path scope, applies patches, and records patch artifacts.
- **Agent runtime:** exposes the standardized restricted tool interface and validates every tool request.
- **Sandbox manager:** provisions isolated task environments and resets clean snapshots.
- **Independent grader:** runs hidden contract tests outside the model workspace and emits versioned, evidence-backed scores.
- **Recorder:** stores raw model outputs, tool traces, patch hashes, timing, usage, costs, environment metadata, and grader results.
- **Reporter:** produces reproducible JSON and Markdown summaries from recorded run artifacts.

## Agent tool contract

Planned tools:
- `list_files`
- `read_file`
- `search_code`
- `inspect_logs`
- `run_tests` (approved public tests only)
- `run_command` (strict allowlist; not arbitrary shell)
- `apply_patch`
- `get_test_results`

All tools require schemas, strict input validation, path traversal protection, output-size limits, execution timeouts, and auditable results. The tool contract must be versioned.

## Security boundaries

Evaluated code and model-generated patches are untrusted:
- run as non-root, unprivileged processes;
- do not mount the Docker socket or host-sensitive paths;
- do not provide host credentials, API keys, or production secrets;
- disable network by default; if a specific dependency-fetch step is required, use a controlled, pinned dependency cache or explicit allowlist;
- enforce CPU, memory, process-count, disk, output-size, and wall-clock limits;
- prevent path traversal and writes outside the task workspace;
- keep hidden tests, reference repairs, and grader internals outside model-accessible boundaries;
- execute the grader in a separate boundary against a frozen artifact;
- treat logs and tool output as untrusted data, not executable instructions.

A container alone is not a complete security boundary. The implementation must document host/runtime assumptions and test isolation controls before untrusted code is evaluated.

## Data flow

Orchestrator → provider adapter → patch or agent mode → isolated task workspace → workspace freeze → independent grader → experiment recorder → report generator.

## Repository layout

- `benchmark/`: model-facing task fixtures and manifests, separated from hidden grading assets.
- `src/`: orchestration, providers, agent tools, sandbox, grading, recording, and reporting.
- `experiments/configurations/`: frozen study configuration and protocol versions.
- `experiments/results/`: generated run artifacts; never commit secrets or restricted provider data.
- `docs/`: research and engineering documentation.
- `tests/`: unit and integration tests for benchmark infrastructure.

## Implementation invariants

1. Model-facing inputs are versioned and hashed.
2. Patch and agent modes receive the same initial evidence.
3. A fresh workspace is provisioned for every run.
4. Agent tools cannot access hidden grading materials.
5. The grader cannot be modified by the evaluated system.
6. Every run, failure, exclusion, and protocol deviation is recorded.
