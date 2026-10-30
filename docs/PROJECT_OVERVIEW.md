# Project Overview

## Purpose

Root Signal evaluates AI systems on realistic production incident investigation and repair across multiple backend ecosystems.

## Modes

### Patch mode
The model receives a repository snapshot and incident evidence and returns a unified diff. The evaluator validates and applies the patch before testing.

### Agent mode
The model uses standardized, restricted tools to inspect the repository, inspect supplied logs, run approved commands and public tests, and apply patches.

Both modes receive equivalent task evidence and start from identical repository snapshots.

## Initial benchmark

| ID | Incident | Ecosystem |
|---|---|---|
| RS-01 | Authentication regression | TypeScript / Node.js |
| RS-02 | Duplicate payment processing | Python / FastAPI |
| RS-03 | Inventory race condition | Go |
| RS-04 | Cross-tenant cache leakage | TypeScript / Node.js |
| RS-05 | Retry amplification | Python / FastAPI |
| RS-06 | Graceful shutdown data loss | Go |

## Non-goals for the first release

- A public hosted agent platform.
- An interactive dashboard.
- Unrestricted autonomous shell access.
- A claim that the initial small experiment establishes universal model rankings.

## Success criteria

A valid release has reproducible task defects, validated reference repairs, independent graders, isolated execution, complete experiment records, and transparent limitations.
