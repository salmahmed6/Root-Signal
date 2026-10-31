import { createHmac, timingSafeEqual } from "node:crypto";

function decodeSegment(segment) {
  return Buffer.from(segment, "base64url").toString("utf8");
}

export function verifyBearerToken(authorization, secret, nowSeconds = Math.floor(Date.now() / 1000)) {
  if (typeof authorization !== "string" || !authorization.startsWith("Bearer ")) {
    return { ok: false, reason: "missing_token" };
  }

  const token = authorization.slice(7);
  const parts = token.split(".");
  if (parts.length !== 3 || parts.some((part) => part.length === 0)) {
    return { ok: false, reason: "malformed_token" };
  }

  try {
    const [encodedHeader, encodedPayload, suppliedSignature] = parts;
    const header = JSON.parse(decodeSegment(encodedHeader));
    const payload = JSON.parse(decodeSegment(encodedPayload));

    if (!header || header.alg !== "HS256") {
      return { ok: false, reason: "unsupported_algorithm" };
    }
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return { ok: false, reason: "malformed_token" };
    }
    if (!Number.isFinite(payload.exp)) {
      return { ok: false, reason: "invalid_expiration" };
    }
    if (payload.exp <= nowSeconds) {
      return { ok: false, reason: "expired_token" };
    }

    const expected = createHmac("sha256", secret)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest();
    const actual = Buffer.from(suppliedSignature, "base64url");
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
      return { ok: false, reason: "invalid_signature" };
    }

    return { ok: true, claims: payload };
  } catch {
    return { ok: false, reason: "malformed_token" };
  }
}
