# Data Collection and Run Record Schema

This document specifies the evidence to capture for every pilot and main-study attempt. It is a data contract for implementation; it does not imply that collection infrastructure or experiment records already exist.

## 1. Data principles

- Preserve raw outputs and traces before deriving scores or summaries.
- Keep planned, pilot, main-study, invalid, excluded, and rerun records distinguishable.
- Never fabricate missing usage, timing, cost, model, or score fields. Use `null` plus a reason.
- Store secrets nowhere in run artifacts. Redact accidental sensitive values before publication and preserve an audit note that redaction occurred.
- Version task inputs, grader, tool contract, runtime, and analysis code.
- Retain enough metadata to reproduce a run from the same task snapshot and configuration, subject to provider availability and model-version drift.
- Respect provider terms and applicable privacy/licensing restrictions when deciding which raw artifacts can be published.

## 2. Run identity and status

Each attempt receives a globally unique `run_id`. A rerun is a new attempt and links to the original via `rerun_of`; never overwrite the first attempt.

Recommended lifecycle statuses:
- `planned`: condition is scheduled but has not started;
- `running`: execution has begun;
- `completed`: execution and grading completed;
- `model_failed`: model-attributable failure (e.g. refusal, timeout under the agreed model budget, invalid output);
- `provider_failed`: provider/routing/API failure;
- `infrastructure_failed`: sandbox, orchestrator, storage, or grader infrastructure failure;
- `excluded`: excluded under a pre-registered rule, with reason;
- `cancelled`: intentionally stopped, with reason.

Only valid completed runs contribute to primary score summaries. Failure rates and invalid attempts must still be reported separately.

## 3. Required record fields

The implementation may normalize these into relational tables or JSON documents, but the semantic fields must be preserved.

| Group | Fields |
|---|---|
| Identity | `run_id`, `study_id`, `attempt_number`, `rerun_of`, `status`, `status_reason` |
| Design | `task_id`, `task_version`, `mode`, `repetition`, `condition_id` |
| Model | `provider`, `requested_model_id`, `returned_model_id`, `model_revision`, `generation_settings` |
| Software | `runtime_version`, `agent_tool_contract_version`, `patch_executor_version`, `sandbox_image_digest`, `grader_version`, `analysis_version` |
| Inputs | `incident_packet_hash`, `repository_snapshot_hash`, `public_test_version`, `configuration_hash`, `random_seed` |
| Timing | `created_at`, `started_at`, `finished_at`, `duration_ms` |
| Usage | `input_tokens`, `output_tokens`, `total_tokens`, `tool_call_count`, `api_cost`, `currency`, `usage_source` |
| Outputs | `raw_response_ref`, `tool_trace_ref`, `patch_ref`, `patch_sha256`, `final_response_ref` |
| Grading | `grader_status`, `dimension_scores`, `total_score`, `test_results_ref`, `critical_failures`, `failure_tags` |
| Governance | `protocol_deviation`, `exclusion_reason`, `reviewer_count`, `review_notes_ref`, `redaction_notes` |

Exact provider-returned model identifiers must be captured when available. A human-friendly alias alone is insufficient. Store generation settings as the actual request values, including temperature, top-p, max output tokens, seed if supported, and tool configuration. Omit unsupported settings rather than inventing them.

## 4. Example JSON record

The following is a schema illustration, not a real run or result:

```json
{
  "run_id": "example-not-a-real-run",
  "study_id": "root-signal-main-v1",
  "attempt_number": 1,
  "rerun_of": null,
  "status": "planned",
  "status_reason": null,
  "task_id": "RS-01",
  "task_version": "0.1.0",
  "mode": "patch",
  "repetition": 1,
  "condition_id": "RS-01__model-a__patch",
  "provider": null,
  "requested_model_id": null,
  "returned_model_id": null,
  "model_revision": null,
  "generation_settings": {},
  "runtime_version": null,
  "agent_tool_contract_version": null,
  "patch_executor_version": null,
  "sandbox_image_digest": null,
  "grader_version": null,
  "analysis_version": null,
  "incident_packet_hash": null,
  "repository_snapshot_hash": null,
  "public_test_version": null,
  "configuration_hash": null,
  "random_seed": null,
  "created_at": null,
  "started_at": null,
  "finished_at": null,
  "duration_ms": null,
  "input_tokens": null,
  "output_tokens": null,
  "total_tokens": null,
  "tool_call_count": null,
  "api_cost": null,
  "currency": null,
  "usage_source": null,
  "raw_response_ref": null,
  "tool_trace_ref": null,
  "patch_ref": null,
  "patch_sha256": null,
  "final_response_ref": null,
  "grader_status": "not_run",
  "dimension_scores": null,
  "total_score": null,
  "test_results_ref": null,
  "critical_failures": [],
  "failure_tags": [],
  "protocol_deviation": null,
  "exclusion_reason": null,
  "reviewer_count": null,
  "review_notes_ref": null,
  "redaction_notes": null
}
```

## 5. Raw artifacts

For each attempt, preserve as applicable:
- exact model request payload after secret-safe normalization;
- exact raw provider response;
- complete agent tool-call trace and tool outputs;
- patch text and applied diff;
- public test commands and outputs;
- independent grader outputs, individual checks, and score rationale;
- environment image/digest and task setup logs;
- timestamps and usage/cost response from provider;
- protocol deviations, failure details, and reviewer records.

Artifact references should be stable and content-addressed where practical. Do not store API keys, authorization headers, or provider secrets in request snapshots.

## 6. Scoring and review records

Store five dimension scores separately: functional correctness (0–35), root-cause diagnosis (0–20), reliability/edge cases (0–20), security/regression safety (0–15), and patch quality (0–10). The total must equal the sum of the five dimensions and be within 0–100.

For diagnosis and patch-quality review, retain reviewer-specific ratings, rubric evidence, and reconciliation notes. Blind reviewers to model identity where feasible. If a second reviewer is unavailable, record that explicitly; do not manufacture inter-rater agreement.

## 7. Failure and exclusion handling

Provider and infrastructure failures must not be silently converted to model failures or dropped from reports. Retain the original attempt and its status. The protocol must define before main-study execution whether and how a failed condition can be rerun. Any rerun gets a new `run_id`, increments the attempt number, and references the original attempt. Report both attempted and valid-run denominators.

## 8. Analysis-ready exports

Generate machine-readable JSONL/CSV exports from canonical records. The report generator should be able to produce:
- planned versus attempted versus valid completed run counts;
- completion and failure rates by provider/model/task/mode;
- score distributions and dimension breakdowns;
- paired patch/agent comparisons for matching conditions;
- runtime, tokens, tool calls, and cost distributions;
- critical failure and exclusion summaries;
- protocol deviations and missing telemetry.

Do not generate or publish aggregate score tables until valid underlying run records exist. The 108-run count is a planned target, not a completed dataset.
