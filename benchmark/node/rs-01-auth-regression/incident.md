# RS-01 Incident Report — Authentication Regression

**Status:** Synthetic benchmark scenario; implementation and validation in progress  
**Service:** Example account API  
**Affected route:** `GET /protected`  
**Severity:** High  
**Environment:** Local, synthetic, no real users or credentials

## Reported impact

The service has continued accepting some bearer tokens that should no longer authorize requests. The security team has requested an investigation of the authentication behavior and a minimal, regression-safe repair.

## Observed behavior

- A valid signed access token is accepted.
- An access token that should be rejected by its claims may still reach protected application logic.
- The service should reject malformed credentials safely and consistently.

## Expected behavior

The protected route must accept only correctly signed, non-expired JWTs using the configured algorithm. Invalid signatures, expired tokens, malformed tokens, and unsupported algorithms must be rejected with an authentication failure. Authorization behavior for valid credentials must remain intact.

## Evidence supplied to the evaluated system

The task repository contains the minimal synthetic service and a local test command. The model should inspect the implementation and determine the cause from the evidence. This report intentionally does not identify a source file or prescribe a fix.

## Constraints

- Do not weaken signature verification or authorization.
- Do not accept unsigned tokens.
- Do not add external network dependencies.
- Do not use real credentials or production data.
- Keep the repair focused and explain any security-relevant behavior changes.
