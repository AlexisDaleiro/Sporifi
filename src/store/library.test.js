import test from "node:test";
import assert from "node:assert/strict";
import useLibraryStore from "./library.js";

const track = (id) => ({ id, title: id, src: `${id}.mp3` });
const s = () => useLibraryStore.getState();
const reset = () => useLibraryStore.setState({ favorites: [], playlists: [], recent: [] });

test("toggleFavorite agrega al frente y quita al repetir", () => {
  reset();
  s().toggleFavorite(track("a"));
  s().toggleFavorite(track("b"));
  assert.deepEqual(s().favorites.map((t) => t.id), ["b", "a"]);
  s().toggleFavorite(track("b"));
  assert.deepEqual(s().favorites.map((t) => t.id), ["a"]);
});

test("createPlaylist devuelve el id, usa nombre por defecto y recorta espacios", () => {
  reset();
  const id1 = s().createPlaylist("  Rock  ");
  const id2 = s().createPlaylist("   ");
  assert.notEqual(id1, id2);
  assert.deepEqual(s().playlists.map((p) => p.name), ["Rock", "Playlist 2"]);
});

test("renamePlaylist ignora nombres vacíos", () => {
  reset();
  const id = s().createPlaylist("Uno");
  s().renamePlaylist(id, "   ");
  assert.equal(s().playlists[0].name, "Uno");
  s().renamePlaylist(id, "Dos");
  assert.equal(s().playlists[0].name, "Dos");
});

test("addToPlaylist no duplica y removeFromPlaylist quita solo esa canción", () => {
  reset();
  const id = s().createPlaylist("P");
  s().addToPlaylist(id, track("a"));
  s().addToPlaylist(id, track("a"));
  s().addToPlaylist(id, track("b"));
  assert.deepEqual(s().playlists[0].tracks.map((t) => t.id), ["a", "b"]);
  s().removeFromPlaylist(id, "a");
  assert.deepEqual(s().playlists[0].tracks.map((t) => t.id), ["b"]);
});

test("deletePlaylist borra solo la indicada", () => {
  reset();
  const a = s().createPlaylist("A");
  s().createPlaylist("B");
  s().deletePlaylist(a);
  assert.deepEqual(s().playlists.map((p) => p.name), ["B"]);
});

test("addRecent mueve al frente, no duplica y limita a 20", () => {
  reset();
  s().addRecent(track("a"));
  s().addRecent(track("b"));
  s().addRecent(track("a"));
  assert.deepEqual(s().recent.map((t) => t.id), ["a", "b"]);
  for (let i = 0; i < 30; i++) s().addRecent(track(`t${i}`));
  assert.equal(s().recent.length, 20);
  assert.equal(s().recent[0].id, "t29");
});
