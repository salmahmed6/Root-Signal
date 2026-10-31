# Limitations and Validity Threats

Root Signal is a small, synthetic benchmark of selected backend production incident classes. Its results should be interpreted as exploratory evidence about these tasks and this protocol—not as a universal measure of software engineering ability or a definitive model ranking.

## Scope limitations

- Six tasks cannot represent the breadth of real production incidents.
- The initial coverage is limited to TypeScript/Node.js, Python/FastAPI, and Go.
- Synthetic repositories and incident evidence may omit organizational, operational, and historical context present in real incidents.
- A task's design may favor particular programming idioms, frameworks, or debugging approaches.

## Measurement limitations

- Three repetitions per condition are useful for observing variability but remain a small sample.
- Runs can be stochastic and may not be statistically independent; task and model effects create clustering.
- Diagnosis and patch-quality scores involve human judgment, even with anchored rubrics.
- Hidden tests are necessarily an operational proxy for correctness, not proof of correctness for all possible inputs.
- Concurrency, timing, and shutdown tests can be nondeterministic unless carefully controlled.

## Model and provider limitations

- Model identifiers, aliases, weights, routing, and provider implementations can change over time.
- Provider rate limits, outages, latency, and usage accounting can affect results.
- Token and cost reporting may be missing, approximate, or provider-specific.
- A provider failure is not evidence of model inability and must be reported separately.

## Fairness and protocol limitations

- Tool access changes the interaction pattern as well as the available observations; this is an intentional treatment but limits interpretation of the mode comparison.
- Equal nominal token/time ceilings may not make unlike interfaces perfectly equivalent.
- Public test availability can shape model behavior; hidden tests reduce but do not eliminate benchmark overfitting.
- Benchmark contamination may occur after public release.

## Mitigations and reporting requirements

- Freeze exact model IDs, settings, task versions, grader versions, budgets, and analysis rules before the main study.
- Use identical initial evidence, fresh environments, randomized run order where practical, and preserved raw artifacts.
- Blind human reviewers to model identity where feasible; report reviewer count and disagreement handling.
- Report per-task results, score dimensions, failure categories, critical security/data-integrity failures, and invalid runs.
- Disclose exclusions, protocol deviations, missing telemetry, and any changes to tasks or graders.
- Avoid universal claims, unsupported causal generalization, and significance claims that the sample and analysis do not support.

## Status

The 108-run main study is planned (6 tasks × 3 models × 2 modes × 3 repetitions). It is not represented here as completed. No model scores, comparative findings, or benchmark validity claims are asserted by this document.
