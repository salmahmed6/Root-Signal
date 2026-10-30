# Contributing

## Principles

- Preserve reproducibility and experimental fairness.
- Keep benchmark tasks small, realistic, and independently testable.
- Never expose hidden grader files or reference solutions to evaluated agents.
- Record exact model identifiers, settings, task versions, grader versions, and run metadata.
- Do not fabricate, edit, or selectively omit model results.

## Development workflow

1. Create a focused issue or select an existing issue.
2. Create a branch from `master`.
3. Implement the smallest complete change.
4. Run the relevant validation and tests.
5. Open a pull request describing the change, test evidence, and any limitations.
6. Do not merge without reviewing the changes and confirming the relevant quality gates.

## Task contribution requirements

Every benchmark task must include an incident report, reproducible defective application, public tests where appropriate, independent hidden grading, a validated reference repair, and a documented expected behavior contract.

## Security

Never commit secrets, real customer data, production credentials, or unredacted incident logs. Use synthetic fixtures.
