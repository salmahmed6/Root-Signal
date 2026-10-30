# Research Methodology

## Research question

Can AI models reliably diagnose, repair, and verify production backend incidents, and does controlled tool access improve outcomes compared with patch-only execution?

## Research questions

- RQ1: Does agent-based execution improve repair success?
- RQ2: Can models identify root causes rather than patch symptoms?
- RQ3: Do repairs remain correct under concurrency and failure?
- RQ4: Do repairs introduce security regressions?
- RQ5: Does performance vary across language ecosystems?
- RQ6: What are the time, token, and API-cost trade-offs?

## Initial design

Three models × six incidents × two modes = 36 initial runs. This is an exploratory comparison, not a statistically conclusive study. Repeat selected cases and report sample sizes and limitations.

## Fairness controls

- Identical task evidence and initial repository snapshots.
- Identical model identifiers and comparable token/time budgets.
- Same public test visibility.
- Same task and grader versions.
- Fresh environment per run.
- No hidden grader or reference-solution access.
- Record provider errors and infrastructure failures separately.

## Modes

Patch mode returns a unified diff. Agent mode uses a standardized tool interface. The additional tool access is the independent variable.

## Primary score

| Dimension | Weight |
|---|---:|
| Functional correctness | 35 |
| Root-cause diagnosis | 20 |
| Reliability and edge cases | 20 |
| Security and regression safety | 15 |
| Patch quality | 10 |
| Total | 100 |

Tool-use efficiency, runtime, token usage, API cost, and mode-specific metrics are reported separately.

## Validity requirements

Every task must have a reproducible defect, a validated reference repair, deterministic tests where feasible, and hidden tests independent of model-visible material. Diagnosis grading must use a predefined rubric. Do not claim statistical significance from one run per condition.
