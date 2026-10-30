# Task Specifications

All six tasks must have: a synthetic incident report, a runnable defective application, logs/evidence, explicit expected behavior, public tests, hidden tests, a validated reference repair, and an independent scoring rubric.

## RS-01 — Authentication Regression
**Ecosystem:** TypeScript / Node.js  
**Defect class:** JWT verification and authentication configuration.  
**Expected repair:** enforce signature, expiration, algorithm, and malformed-token checks without breaking legitimate authentication.  
**Hidden checks:** invalid signature, expired token, unsupported algorithm, malformed token, regression behavior.

## RS-02 — Duplicate Payment Processing
**Ecosystem:** Python / FastAPI  
**Defect class:** webhook retries and non-atomic idempotency.  
**Expected repair:** safely process repeated and concurrent events with transaction integrity.  
**Hidden checks:** duplicate event, concurrent delivery, failed processing, distinct event IDs.

## RS-03 — Inventory Race Condition
**Ecosystem:** Go  
**Defect class:** concurrent inventory reservation.  
**Expected repair:** atomic reservation and consistent stock state.  
**Hidden checks:** simultaneous last-item purchases, nonnegative stock, failed reservation, independent SKUs.

## RS-04 — Cross-Tenant Cache Leakage
**Ecosystem:** TypeScript / Node.js  
**Defect class:** tenant-insensitive cache keys or authorization boundary.  
**Expected repair:** enforce tenant-aware cache access and invalidation while retaining authorization checks.  
**Hidden checks:** tenant separation, invalidation isolation, missing tenant context, authorization independent of cache.

## RS-05 — Retry Amplification
**Ecosystem:** Python / FastAPI  
**Defect class:** unbounded or unsafe retries.  
**Expected repair:** bounded retries, timeouts, backoff, and retryability policy.  
**Hidden checks:** retry limits, non-retryable responses, timeout behavior, unsafe repeated operations.

## RS-06 — Graceful Shutdown Data Loss
**Ecosystem:** Go  
**Defect class:** abrupt termination of in-flight requests or background work.  
**Expected repair:** bounded graceful shutdown and safe draining/cancellation.  
**Hidden checks:** stop accepting new work, drain in-flight requests, shutdown deadline, resource cleanup, repeated signals.

Task-specific contracts must be precise before implementation. Do not rely on vague requirements or tests that merely check implementation details.
