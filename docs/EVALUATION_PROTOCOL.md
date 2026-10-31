# Evaluation Protocol

This document defines the run procedure, grading rules, resource controls, and failure handling for Root Signal. It is a specification for implementation; it does not claim that the runtime or graders are already implemented.

## 1. Run unit and inputs

A run is one task × exact model identifier × execution mode × repetition. Every run receives a fresh task snapshot and a versioned incident packet containing the synthetic incident report, relevant logs, repository state, and documented public context.

Patch and agent modes must receive identical initial model-visible evidence. The task manifest records hashes/versions for the snapshot, incident packet, public tests, hidden grader, and reference repair. Hidden materials are never mounted into the model-accessible workspace.

## 2. Patch mode

1. Provision a clean, isolated task snapshot.
2. Provide the incident packet and documented repository context.
3. Request a structured diagnosis (root cause, evidence, proposed repair, risks) and a unified diff.
4. Validate diff syntax, target paths, and allowed file scope.
5. Apply the patch in the isolated workspace. Invalid or unsafe patches are recorded and score accordingly; do not silently repair model output.
6. Run the public tests available to the evaluated system, if any are part of the task contract.
7. Freeze the workspace and invoke the independent grader outside the model workspace.
8. Persist the raw response, patch, test output, grader output, and run metadata.

## 3. Agent mode

1. Provision the same clean task snapshot and initial incident packet.
2. Expose only the standardized, restricted tool interface.
3. Validate every tool request against the allowlist and workspace boundaries.
4. Enforce the run's shared token and wall-clock ceilings plus tool-specific limits.
5. Record every tool call, arguments, result, exit status, and timestamp, with secrets redacted (ideally none are present).
6. Freeze the workspace on final response, timeout, or termination.
7. Invoke the independent grader outside the agent workspace.
8. Persist the full interaction trace, final response, patch diff, test output, grader output, and metadata.

## 4. Agent tool contract

The planned tools are:
- `list_files`
- `read_file`
- `search_code`
- `inspect_logs`
- `run_tests` (approved public tests only)
- `run_command` (strict allowlist; no arbitrary shell)
- `apply_patch`
- `get_test_results`

Tool schemas, argument validation, output-size limits, path traversal protection, command allowlists, and error semantics must be versioned and tested. Tools must not expose hidden tests, reference fixes, host files, host credentials, Docker socket, or unrestricted network access.

## 5. Scoring rubric (0–100)

Each dimension is scored against task-specific anchors documented in the task manifest. Graders must provide evidence for awarded points.

| Dimension | Weight | Operational interpretation |
|---|---:|---|
| Functional correctness | 35 | Hidden contract tests pass; required behavior is restored; no prohibited behavior or invalid patch. |
| Root-cause diagnosis | 20 | Diagnosis identifies the causal defect, cites relevant evidence, explains the failure mechanism, and distinguishes cause from symptoms. |
| Reliability and edge cases | 20 | Repair handles specified concurrency, retry, timeout, shutdown, malformed-input, and failure cases relevant to that task. |
| Security and regression safety | 15 | No new security boundary violation; relevant auth, authorization, tenant isolation, input validation, and regression checks pass. |
| Patch quality | 10 | Change is focused, maintainable, idiomatic for the ecosystem, and includes appropriate error handling without unrelated churn. |
| **Total** | **100** | |

### Scoring mechanics

- Functional correctness is based primarily on independent, task-specific hidden tests and contract checks. The grader records each check and its weight.
- Reliability and security dimensions use additional independent tests plus explicit task-specific checks. A test may support only one dimension unless the rubric explicitly defines a justified split; avoid double counting.
- Diagnosis and patch quality are evaluated against anchored rubrics by two reviewers blinded to model identity where feasible. Reviewers record evidence and reconcile material disagreements. If only one reviewer is available, disclose that limitation and retain the original ratings.
- LLM-based judging may be used only as a clearly labeled secondary analysis, never as the sole authority for primary scores.
- A critical security failure or data-integrity violation must be flagged separately even if the numeric score is otherwise high.
- Missing artifacts are not guessed. A missing diagnosis receives no diagnosis credit; a missing or invalid patch receives no implementation credit where applicable.

Task manifests must define test-to-dimension mapping and scoring anchors before model runs begin.

## 6. Resource budgets

The main study must use comparable total budgets for both modes. Exact ceilings are **not yet frozen**. The RS-01 pilot must establish feasible limits for wall-clock time, total model tokens, output tokens, agent tool calls, command duration, and API cost. Record the rationale and freeze numeric values before the main study. Do not tune budgets per model after seeing main-study outcomes.

Tool calls and command execution count against wall-clock time. Agent mode must not receive an unlimited context or retry advantage. Provider-enforced limits and actual usage must be recorded.

## 7. Failure taxonomy and disposition

Classify each run with one primary outcome and any secondary tags:

- diagnosis error / incomplete investigation;
- symptom-only or incomplete repair;
- functional regression;
- concurrency or reliability failure;
- security or tenant-isolation regression;
- invalid or out-of-scope patch;
- verification omission;
- tool misuse / policy violation;
- model timeout or refusal;
- provider/API failure (rate limit, outage, unavailable model);
- infrastructure/sandbox/grader failure.

Provider and infrastructure failures are not model-quality failures. Mark them separately as non-evaluable or infrastructure-invalid according to the pre-registered rules. Preserve their records. Do not replace a failed run selectively based on its apparent quality. Any rerun must follow a documented rule applied consistently to the affected condition and must retain the original attempt.

## 8. Run completion and grader independence

The evaluated system cannot inspect grader code, hidden tests, reference repairs, or grader outputs before its final response and workspace freeze. The grader runs in a separate boundary, consumes a read-only snapshot/artifact, and emits versioned results. Grader failure invalidates the score until the grader is repaired and the rerun policy is applied.

## 9. Required reporting

Report the total score and all dimensions, task-level pass/fail checks, critical failures, run validity, failure taxonomy, runtime, token usage, cost, and agent tool metrics. Publish exact model/provider identifiers and settings, task/grader versions, exclusions, deviations, and raw outputs where license and provider terms permit. Mark unavailable values explicitly; never fabricate telemetry or results.
