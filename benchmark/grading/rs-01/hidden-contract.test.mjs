import test from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { verifyBearerToken } from "./reference-auth.mjs";

const SECRET = "rs01-grader-only-secret";
const NOW = 1_800_000_000;
const b64 = (v) => Buffer.from(JSON.stringify(v)).toString("base64url");
function token(header, payload, secret = SECRET, signatureOverride) {
  const h = b64(header), p = b64(payload), input = `${h}.${p}`;
  const signature = signatureOverride ?? createHmac("sha256", secret).update(input).digest("base64url");
  return `Bearer ${input}.${signature}`;
}

test("rejects missing expiration", () => {
  assert.equal(verifyBearerToken(token({alg:"HS256"},{sub:"u"}), SECRET, NOW).ok, false);
});
test("rejects non-numeric expiration", () => {
  assert.deepEqual(verifyBearerToken(token({alg:"HS256"},{sub:"u",exp:"tomorrow"}), SECRET, NOW), {ok:false,reason:"invalid_expiration"});
});
test("rejects future-issued token with a tampered signature", () => {
  const value = token({alg:"HS256"},{sub:"u",exp:NOW+100},"wrong-secret");
  assert.deepEqual(verifyBearerToken(value, SECRET, NOW), {ok:false,reason:"invalid_signature"});
});
test("rejects algorithm confusion and unsigned tokens", () => {
  const value = token({alg:"none"},{sub:"u",exp:NOW+100});
  assert.deepEqual(verifyBearerToken(value, SECRET, NOW), {ok:false,reason:"unsupported_algorithm"});
});
test("rejects malformed JSON segments", () => {
  const value = `Bearer ${Buffer.from("{").toString("base64url")}.e30.signature`;
  assert.deepEqual(verifyBearerToken(value, SECRET, NOW), {ok:false,reason:"malformed_token"});
});
