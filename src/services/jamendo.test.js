import test from "node:test";
import assert from "node:assert/strict";
import { request, normalizeTrack, JamendoError } from "./jamendo.js";

const reply = (body) => async () => ({ ok: true, json: async () => body });

test("normalizeTrack completa con datos del padre y portada por defecto", () => {
  const t = normalizeTrack(
    { id: 7, name: "A", duration: "120", audio: "u" },
    { artistId: "3", artistName: "X" }
  );
  assert.deepEqual(t, {
    id: "7", title: "A", artistId: "3", artistName: "X", albumId: "", albumName: "",
    cover: "/default-cover.svg", src: "u", duration: 120,
  });
});

test("normalizeTrack: los campos del track ganan sobre los del padre", () => {
  const t = normalizeTrack(
    { id: 1, name: "B", artist_id: 9, artist_name: "Y", album_image: "cover.jpg", audio: "u" },
    { artistId: "3", artistName: "X", cover: "padre.jpg" }
  );
  assert.equal(t.artistId, "9");
  assert.equal(t.artistName, "Y");
  assert.equal(t.cover, "cover.jpg");
});

test("request falla con status != success aunque HTTP sea 200", async () => {
  globalThis.fetch = reply({ headers: { status: "failed", code: 5, error_message: "bad key" }, results: [] });
  await assert.rejects(request("tracks", {}, "id"), (e) => e instanceof JamendoError && /bad key/.test(e.message));
});

test("request devuelve results cuando status es success", async () => {
  globalThis.fetch = reply({ headers: { status: "success", code: 0 }, results: [{ id: 1 }] });
  assert.deepEqual(await request("tracks", {}, "id"), [{ id: 1 }]);
});

test("request sin client_id falla con mensaje claro", async () => {
  await assert.rejects(request("tracks", {}, ""), /VITE_JAMENDO_CLIENT_ID/);
});
