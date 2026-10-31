# RS-01 Grading Assets

These assets are for the benchmark operator and independent grader, not the evaluated model workspace.

- `reference-auth.mjs`: reference behavior for the task contract.
- `hidden-contract.test.mjs`: adversarial checks beyond the public tests.

For a real evaluation deployment, keep this directory in a separately access-controlled grading package or private repository. Excluding it from a prompt/workspace is not sufficient secrecy if the evaluated participant can browse the public repository or its history.

The reference implementation is a candidate and must be run against the task fixture and reviewed before the task is marked validated.
