import test from "node:test";
import assert from "node:assert/strict";
import formatTime, { formatTotal } from "./formatTime.js";

test("formatTime", () => {
  assert.equal(formatTime(65), "1:05");
  assert.equal(formatTime(600), "10:00");
  assert.equal(formatTime(NaN), "0:00");
  assert.equal(formatTime(undefined), "0:00");
});

test("formatTotal", () => {
  assert.equal(formatTotal(0), "0 min");
  assert.equal(formatTotal(2700), "45 min");
  assert.equal(formatTotal(4320), "1 h 12 min");
});
