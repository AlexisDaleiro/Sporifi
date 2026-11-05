import test from "node:test";
import assert from "node:assert/strict";
import usePlayerStore, { selectCurrentTrack } from "./zustand.js";

const tracks = ["a", "b", "c"].map((id) => ({ id, title: id, src: `${id}.mp3` }));
const s = () => usePlayerStore.getState();
const current = () => selectCurrentTrack(s())?.id;
const reset = () => usePlayerStore.setState({ queue: [], order: [], pos: -1, isPlaying: false, shuffle: false, repeat: "off" });

test("playQueue arranca en el índice pedido", () => {
  reset();
  s().playQueue(tracks, 1);
  assert.equal(current(), "b");
  assert.equal(s().isPlaying, true);
});

test("next/prev recorren la cola y no cambian nada en los extremos con repeat off", () => {
  reset();
  s().playQueue(tracks, 1);
  assert.equal(s().next(), true);
  assert.equal(current(), "c");
  assert.equal(s().next(), false);
  assert.equal(current(), "c");
  s().prev(); s().prev();
  assert.equal(current(), "a");
  assert.equal(s().prev(), false);
});

test("repeat all envuelve en ambos extremos", () => {
  reset();
  usePlayerStore.setState({ repeat: "all" });
  s().playQueue(tracks, 2);
  s().next();
  assert.equal(current(), "a");
  s().prev();
  assert.equal(current(), "c");
});

test("cycleRepeat recorre off -> all -> one -> off", () => {
  reset();
  const seen = [];
  for (let i = 0; i < 3; i++) { s().cycleRepeat(); seen.push(s().repeat); }
  assert.deepEqual(seen, ["all", "one", "off"]);
});

test("toggleShuffle conserva la canción actual y al apagarlo vuelve al orden original", () => {
  reset();
  s().playQueue(tracks, 1);
  s().toggleShuffle();
  assert.equal(current(), "b");
  assert.equal(s().pos, 0);
  assert.deepEqual([...s().order].sort(), [0, 1, 2]);
  s().toggleShuffle();
  assert.equal(current(), "b");
  assert.deepEqual(s().order, [0, 1, 2]);
});

test("togglePlay no hace nada sin canción y alterna con una cola", () => {
  reset();
  s().togglePlay();
  assert.equal(s().isPlaying, false);
  s().playQueue(tracks, 0);
  s().togglePlay();
  assert.equal(s().isPlaying, false);
});
