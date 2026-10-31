# Task Specifications

This document defines the six planned benchmark scenarios. These are task designs, not yet claims of implemented or validated fixtures. Each task must be converted into a versioned manifest and runnable defective application before it can enter the pilot or main study.

## Common task contract

Every task must include:
- a synthetic incident report with impact, symptoms, timeline, and relevant observations;
- a runnable repository snapshot in a reproducible environment;
- a known defective state and a separately stored reference repair;
- explicit expected behavior and prohibited behavior;
- model-visible logs/evidence that are sufficient to investigate without revealing the reference fix;
- public tests, if included in the task prompt/workspace, and independent hidden contract tests;
- a task-specific scoring map, root-cause rubric, and regression/security checks;
- deterministic setup/reset instructions where feasible, pinned dependencies, and a task version;
- evidence that the defective state fails the relevant contract and the reference repair passes it.

No task is eligible for scored experiments until its defect, reference repair, tests, grader, and isolation boundary have been validated.

## RS-01 — Authentication Regression

**Ecosystem:** TypeScript / Node.js  
**Defect class:** JWT verification/configuration regression.  
**Intended behavior:** Accept valid, correctly signed, non-expired tokens under the configured algorithm; reject invalid signatures, expired tokens, malformed tokens, and unsupported algorithms. Preserve legitimate authorization behavior.  
**Evidence:** Synthetic authentication logs, relevant configuration, and the affected verification path.  
**Critical risks:** Algorithm confusion, signature bypass, expiry bypass, malformed-token crashes, accidental weakening of authorization.  
**Required checks:** valid token; invalid signature; expired token; malformed token; unsupported algorithm; regression behavior; relevant authorization boundary.  
**Implementation status:** Planned; pilot candidate. Not yet represented as a validated benchmark task.

## RS-02 — Duplicate Payment Processing

**Ecosystem:** Python / FastAPI  
**Defect class:** Webhook retry handling and non-atomic idempotency.  
**Intended behavior:** Process each unique provider event at most once while safely handling repeated and concurrent delivery. Preserve transaction integrity and recover safely from processing failure.  
**Evidence:** Synthetic webhook delivery logs, event identifiers, and relevant handler/storage code.  
**Critical risks:** duplicate charges/fulfillment, lost events, inconsistent persisted state, incorrectly suppressing distinct events.  
**Required checks:** repeated same event; concurrent same event; distinct event IDs; failure between receipt and processing; transaction rollback/recovery.  
**Implementation status:** Planned; not yet implemented or validated.

## RS-03 — Inventory Race Condition

**Ecosystem:** Go  
**Defect class:** Concurrent inventory reservation.  
**Intended behavior:** Concurrent reservations must not oversell stock; inventory remains nonnegative and state changes are atomic. Failed reservations must not corrupt state.  
**Evidence:** Synthetic order/reservation logs and relevant inventory code.  
**Critical risks:** overselling, negative stock, lost updates, deadlocks or unsafe retries.  
**Required checks:** simultaneous last-item reservations; nonnegative stock; failed reservation; independent SKUs; repeated requests according to the defined contract.  
**Implementation status:** Planned; not yet implemented or validated.

## RS-04 — Cross-Tenant Cache Leakage

**Ecosystem:** TypeScript / Node.js  
**Defect class:** Tenant-insensitive cache key or authorization boundary.  
**Intended behavior:** A tenant can access only its own data regardless of cache state, request order, or invalidation. Authorization must remain independent of cache hits.  
**Evidence:** Synthetic multi-tenant request traces and relevant cache/authorization code.  
**Critical risks:** cross-tenant data disclosure, cache poisoning, authorization bypass, broad invalidation affecting unrelated tenants.  
**Required checks:** tenant separation; cache hit/miss isolation; tenant-specific invalidation; missing tenant context; authorization on cache hit; adversarial request ordering.  
**Implementation status:** Planned; not yet implemented or validated.

## RS-05 — Retry Amplification

**Ecosystem:** Python / FastAPI  
**Defect class:** Unbounded or unsafe retry behavior.  
**Intended behavior:** Apply bounded retries only to eligible failures, with timeouts and backoff; avoid retrying non-idempotent operations unless protected by idempotency.  
**Evidence:** Synthetic upstream failure logs, retry configuration, and relevant client/handler code.  
**Critical risks:** retry storms, amplified load, duplicate side effects, unbounded latency.  
**Required checks:** retry ceiling; non-retryable response; timeout; backoff bounds; unsafe repeated operation; successful recovery.  
**Implementation status:** Planned; not yet implemented or validated.

## RS-06 — Graceful Shutdown Data Loss

**Ecosystem:** Go  
**Defect class:** Abrupt termination of in-flight requests or background work.  
**Intended behavior:** Stop accepting new work, allow in-flight work to drain within a bounded deadline, cancel safely when the deadline expires, and release resources.  
**Evidence:** Synthetic shutdown logs and relevant server/worker lifecycle code.  
**Critical risks:** dropped acknowledged work, indefinite shutdown, leaked resources, inconsistent state after repeated signals.  
**Required checks:** stop accepting new work; drain in-flight requests; deadline behavior; cancellation; resource cleanup; repeated shutdown signal.  
**Implementation status:** Planned; not yet implemented or validated.

## Task acceptance gate

A task may be marked ready for scored runs only after:
1. defect reproduction is demonstrated from a clean checkout;
2. reference repair passes all task contract tests;
3. defective baseline fails the intended tests;
4. hidden grader is independent and inaccessible to the evaluated system;
5. reset produces equivalent clean state;
6. task-specific scoring anchors and test mappings are reviewed;
7. sandbox and resource constraints are tested;
8. task manifest, dependencies, and evidence are versioned and hashed.
