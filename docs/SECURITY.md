# Benchmark Security Design

This document supplements the repository security policy with benchmark-specific controls.

- Model-generated code and commands are untrusted.
- Run each evaluation in a disposable isolated container.
- Never use privileged containers.
- Never mount the Docker socket into a task container.
- Disable network access by default.
- Use allowlisted commands rather than arbitrary shell execution.
- Apply CPU, memory, process-count, and wall-clock limits.
- Keep API credentials in the orchestrator only; never pass them into task containers.
- Keep hidden tests, reference solutions, and grader configuration outside model-visible workspaces.
- Treat task logs and model outputs as potentially sensitive.
- Use synthetic data only.
- Record denied tool operations and sandbox errors.
