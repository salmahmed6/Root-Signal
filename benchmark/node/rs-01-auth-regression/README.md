# RS-01 — Authentication Regression

This directory is the **model-facing task fixture** for Root Signal's first planned benchmark incident.

## Requirements

- Node.js 20+
- No third-party runtime dependencies

## Run the task

```bash
npm run test:public
```

The public contract tests are expected to expose failures in the defective starter implementation. A non-zero test exit at this stage is intentional and is not a benchmark result.

To inspect the service logic, review `app.mjs`. The task's incident context is in `incident.md`.

## Task boundary

Only this directory should be copied into a model-facing workspace for RS-01. Reference repairs, hidden tests, and grader internals must remain outside that workspace.

## Status

Fixture implementation is in progress. The task is not yet approved for pilot or scored runs. The defective baseline, reference repair, hidden grader, and sandbox isolation still require validation.
