# Research Methodology

## 1. Objective and scope

Root Signal evaluates whether AI systems can investigate, diagnose, repair, and verify realistic backend production incidents. It compares patch-only execution with controlled agent execution. The benchmark is designed to measure task-level performance under a documented, reproducible protocol—not to establish a universal ranking of AI models.

All incidents and evidence must be synthetic. No customer data, production secrets, or private operational logs may be used.

## 2. Research questions and hypotheses

- **RQ1 — Mode effect:** Under comparable budgets and identical initial evidence, how does controlled agent execution compare with patch-only execution on the primary score and task completion?
- **RQ2 — Diagnosis:** How accurately does each system identify the underlying root cause, rather than describe symptoms or propose a superficial workaround?
- **RQ3 — Reliability:** Do repairs preserve required behavior under concurrency, retries, timeouts, and shutdown/failure conditions?
- **RQ4 — Security:** Do repairs preserve or improve authentication, authorization, tenant isolation, and other relevant security boundaries?
- **RQ5 — Ecosystem:** How do outcomes differ across the selected TypeScript/Node.js, Python/FastAPI, and Go tasks?
- **RQ6 — Efficiency:** What time, token, tool-call, and API-cost trade-offs accompany successful and unsuccessful repairs?

**Primary hypothesis (H1):** Agent mode will achieve a higher mean task score than patch mode under the pre-registered protocol and comparable resource ceilings.

**Secondary hypotheses:** H2, agent mode will improve root-cause diagnosis; H3, agent mode will improve verification and edge-case coverage; H4, any quality improvement may require additional time, tokens, or API cost.

These are hypotheses, not findings. They will be evaluated only after valid runs are collected.

## 3. Experimental design

The planned main study is a fully crossed design:

| Factor | Planned levels |
|---|---|
| Tasks | 6 (RS-01 to RS-06) |
| Models | 3 exact model identifiers, selected and frozen before main runs |
| Modes | Patch, agent |
| Repetitions | 3 fresh-environment repetitions per condition |
| Planned total | **108 runs** |

Calculation: 6 tasks × 3 models × 2 modes × 3 repetitions = 108 runs.

The three model identifiers and provider routing must be recorded exactly at experiment freeze time. Model names in planning notes are not substitutes for provider-returned identifiers. Do not silently replace a model during a study. If a model becomes unavailable, record the affected condition as blocked/provider failure and document any amended protocol.

The three repetitions are intended to expose run-to-run variability; they do not make the study statistically conclusive. Each repetition starts from a fresh task environment. Where supported, randomize run order and record seeds and relevant environment versions.

## 4. Pilot and protocol freeze

Before the main study, run a pilot on RS-01 to verify:
- task setup and reset are reproducible;
- the defect is observable from model-visible evidence;
- the reference repair passes the task contract;
- public and hidden graders distinguish defective and repaired states;
- patch application and agent tools work as specified;
- sandbox isolation and resource limits are effective;
- telemetry captures the required metadata;
- preliminary time/token/cost budgets are feasible.

Pilot runs are engineering validation and must be labeled separately. They are not silently included in the 108 main-study runs. After the pilot, freeze task versions, grader versions, exact model IDs, model settings, budgets, and analysis/exclusion rules before collecting main-study results. Any later change requires a versioned protocol amendment and transparent reporting.

## 5. Fairness and controls

- Provide identical initial incident reports, logs, repository snapshots, and other model-visible evidence to both modes for a given task condition.
- Use the same exact model identifier and compatible generation settings for the paired modes.
- Apply comparable total token and wall-clock ceilings. Agent tool calls consume the run's wall-clock/token budget; tool execution limits are also enforced.
- Keep public-test visibility equivalent. Hidden tests, reference solutions, grader internals, and scoring secrets remain unavailable to evaluated systems.
- Use the same task and grader versions for paired runs.
- Start each run from a fresh, clean environment.
- Randomize run order where practical to reduce ordering and provider-load effects.
- Record all deviations, retries, provider errors, and infrastructure failures. Do not selectively rerun poor model outputs.

Patch mode returns a structured diagnosis and unified diff. Agent mode receives the same initial evidence and can gather further observations only through the documented restricted tools. This additional interaction is the treatment being evaluated.

## 6. Primary outcome and scoring

Each valid run receives a score from 0 to 100:

| Dimension | Weight |
|---|---:|
| Functional correctness | 35 |
| Root-cause diagnosis | 20 |
| Reliability and edge cases | 20 |
| Security and regression safety | 15 |
| Patch quality | 10 |
| **Total** | **100** |

Operational grading rules are specified in [EVALUATION_PROTOCOL.md](EVALUATION_PROTOCOL.md). Report each dimension as well as the total. Do not let a high score in one dimension conceal a critical security or correctness failure; report critical failures separately.

Time, token usage, API cost, tool calls, test outcomes, and verification behavior are supplementary metrics, not extra points added to the primary score.

## 7. Analysis plan

- Report counts, completion rates, means, medians, dispersion, and per-task/per-model/per-mode breakdowns.
- Compare patch and agent modes within matching task/model/repetition conditions.
- Show individual task outcomes and failure categories; do not report only aggregate averages.
- Report uncertainty intervals only where the chosen method and sample structure justify them. Treat repeated runs as clustered by task and model; do not assume all 108 observations are independent.
- Do not claim statistical significance, causal generality, or universal model superiority from this small benchmark.
- Keep provider/infrastructure failures separate from model-attributable failures. Predefine exclusion and replacement rules before main-study collection.
- Preserve raw outputs and analysis scripts so reported summaries can be reproduced.

## 8. Validity and limitations

The task set is small, synthetic, and intentionally focused on backend production incidents. Three languages do not represent all software ecosystems. Model/provider updates, stochastic outputs, rate limits, test nondeterminism, evaluator subjectivity, and benchmark contamination can affect results. See [LIMITATIONS.md](LIMITATIONS.md).

## 9. Research integrity

At the time this specification is written, the 108-run experiment is planned. No main-study runs, scores, comparative findings, or validated benchmark results are asserted by this document. All reports must distinguish planned, pilot, failed, excluded, and completed main-study runs.
