import { createHmac } from "node:crypto";

const JWT_SECRET = process.env.JWT_SECRET ?? "root-signal-rs01-local-test-secret";

function decodeSegment(segment) {
  return Buffer.from(segment, "base64url").toString("utf8");
}

/**
 * Synthetic starter implementation for RS-01.
 * This baseline intentionally contains an authentication regression.
 * Do not use this code in production.
 */
export function authenticateBearer(authorization, secret = JWT_SECRET, nowSeconds = Math.floor(Date.now() / 1000)) {
  if (typeof authorization !== "string" || !authorization.startsWith("Bearer ")) {
    return { ok: false, reason: "missing_token" };
  }

  const token = authorization.slice("Bearer ".length);
  const parts = token.split(".");
  if (parts.length !== 3 || parts.some((part) => part.length === 0)) {
    return { ok: false, reason: "malformed_token" };
  }

  try {
    const [encodedHeader, encodedPayload, suppliedSignature] = parts;
    const header = JSON.parse(decodeSegment(encodedHeader));
    const payload = JSON.parse(decodeSegment(encodedPayload));

    // Regression: the implementation calculates an HS256 MAC but does not
    // enforce the token's declared algorithm or validate its expiration.
    const expectedSignature = createHmac("sha256", secret)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest("base64url");

    if (header.alg === "none") {
      return { ok: true, claims: payload };
    }

    if (suppliedSignature !== expectedSignature) {
      return { ok: false, reason: "invalid_signature" };
    }

    // BUG: exp is not checked. Expired bearer tokens are accepted.
    return { ok: true, claims: payload };
  } catch {
    return { ok: false, reason: "malformed_token" };
  }
}

export function handleProtectedRequest(request, nowSeconds) {
  const result = authenticateBearer(request.headers.authorization, JWT_SECRET, nowSeconds);
  if (!result.ok) {
    return { status: 401, body: { error: "unauthorized", reason: result.reason } };
  }

  return { status: 200, body: { subject: result.claims.sub, scope: result.claims.scope ?? [] } };
}
