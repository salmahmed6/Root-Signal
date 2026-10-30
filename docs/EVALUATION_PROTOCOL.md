# Evaluation Protocol

## Patch mode

1. Create a clean task snapshot.
2. Send incident evidence and repository context.
3. Request diagnosis and unified diff.
4. Validate diff syntax and paths.
5. Apply patch in isolated workspace.
6. Run public tests.
7. Freeze workspace and invoke independent grader.
8. Record results and metadata.

## Agent mode

1. Create the same clean task snapshot.
2. Send the same incident evidence.
3. Give access to standardized restricted tools.
4. Enforce tool-call, token, and time budgets.
5. Record all tool calls and outputs.
6. Freeze workspace after final response or timeout.
7. Invoke independent grader outside the agent workspace.
8. Record results and metadata.

## Scoring

Functional correctness (35), diagnosis (20), reliability (20), security/regression safety (15), and patch quality (10).

Agent tool efficiency and patch-specific metrics are supplementary, not silently added to the primary score.

## Required run metadata

Record experiment ID, task ID/version, mode, provider, exact model ID, model version if available, settings, grader version, timestamps, duration, token usage, API cost if available, tool traces, patch hash, test outcomes, and score.

Missing data must be marked unavailable. Never invent values.

## Failure taxonomy

Incorrect diagnosis, incomplete investigation, incorrect implementation, symptom-only fix, concurrency failure, security regression, missing error handling, invalid patch, tool misuse, timeout, provider error, or infrastructure failure.
