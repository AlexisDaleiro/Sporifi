import test from "node:test";
import assert from "node:assert/strict";
import { shuffledOrder, nextPos, prevPos } from "./queue.js";

test("shuffledOrder es una permutación y deja primero la canción actual", () => {
  const order = shuffledOrder(10, 4, () => 0.3);
  assert.equal(order[0], 4);
  assert.deepEqual([...order].sort((a, b) => a - b), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test("shuffledOrder sin canción actual y con cola vacía", () => {
  assert.deepEqual(shuffledOrder(0), []);
  assert.equal(shuffledOrder(5).length, 5);
});

test("nextPos: avanza, termina con repeat off y vuelve al inicio con repeat all", () => {
  assert.equal(nextPos(0, 3, "off"), 1);
  assert.equal(nextPos(2, 3, "off"), null);
  assert.equal(nextPos(2, 3, "all"), 0);
  assert.equal(nextPos(-1, 0, "all"), null);
});

test("prevPos: retrocede, tope con repeat off y salto al final con repeat all", () => {
  assert.equal(prevPos(2, 3, "off"), 1);
  assert.equal(prevPos(0, 3, "off"), null);
  assert.equal(prevPos(0, 3, "all"), 2);
});
