import test from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { authenticateBearer, handleProtectedRequest } from "../app.mjs";

const SECRET = "rs01-public-test-secret";
const NOW = 1_800_000_000;

function encode(value) {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

function makeToken({ header = { alg: "HS256", typ: "JWT" }, payload = { sub: "user-123", exp: NOW + 300 }, secret = SECRET, signature = true } = {}) {
  const encodedHeader = encode(header);
  const encodedPayload = encode(payload);
  const input = `${encodedHeader}.${encodedPayload}`;
  const signed = createHmac("sha256", secret).update(input).digest("base64url");
  return `${input}.${signature ? signed : "invalid-signature"}`;
}

test("accepts a correctly signed, non-expired HS256 token", () => {
  const token = makeToken();
  const result = authenticateBearer(`Bearer ${token}`, SECRET, NOW);
  assert.equal(result.ok, true);
  assert.equal(result.claims.sub, "user-123");
});

test("rejects an expired token", () => {
  const token = makeToken({ payload: { sub: "user-123", exp: NOW - 1 } });
  const result = authenticateBearer(`Bearer ${token}`, SECRET, NOW);
  assert.deepEqual(result, { ok: false, reason: "expired_token" });
});

test("rejects a token with an invalid signature", () => {
  const token = makeToken({ signature: false });
  const result = authenticateBearer(`Bearer ${token}`, SECRET, NOW);
  assert.deepEqual(result, { ok: false, reason: "invalid_signature" });
});

test("rejects unsupported signing algorithms, including none", () => {
  const noneToken = makeToken({ header: { alg: "none", typ: "JWT" } });
  const result = authenticateBearer(`Bearer ${noneToken}`, SECRET, NOW);
  assert.deepEqual(result, { ok: false, reason: "unsupported_algorithm" });
});

test("rejects malformed tokens without throwing", () => {
  const result = authenticateBearer("Bearer not.a.valid.jwt.token", SECRET, NOW);
  assert.deepEqual(result, { ok: false, reason: "malformed_token" });
});

test("protected request does not disclose claims for rejected credentials", () => {
  const token = makeToken({ payload: { sub: "user-123", exp: NOW - 1 } });
  const response = handleProtectedRequest({ headers: { authorization: `Bearer ${token}` } }, NOW);
  assert.equal(response.status, 401);
  assert.equal(response.body.error, "unauthorized");
});
