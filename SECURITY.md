# Security Policy

Root Signal executes model-generated code and commands as part of its research. Treat all model output and task repositories as untrusted.

## Reporting

Please do not publish exploitable vulnerabilities in the benchmark runner or sandbox before maintainers have had an opportunity to investigate. Report security concerns privately through the repository owner's GitHub security contact or GitHub's private vulnerability reporting feature if enabled.

## Required safeguards

- Run evaluated code only in isolated containers.
- Do not run containers as privileged.
- Do not mount the host Docker socket into task containers.
- Do not expose host credentials or API keys to evaluated code.
- Disable task-container network access by default.
- Enforce CPU, memory, process, and time limits.
- Keep hidden graders and reference solutions outside the model workspace.
- Treat logs and model outputs as potentially sensitive.
