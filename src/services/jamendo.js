// Cliente mínimo de la API v3 de Jamendo. Docs: https://developer.jamendo.com/v3.0/docs
const BASE = "https://api.jamendo.com/v3.0";
const DEFAULT_COVER = "/default-cover.svg";
const TRACK_PARAMS = { audioformat: "mp32", imagesize: 300 };

export class JamendoError extends Error {}

// Jamendo responde HTTP 200 aun cuando falla: el error real viene en headers.status.
export async function request(
  path,
  params = {},
  clientId = import.meta.env?.VITE_JAMENDO_CLIENT_ID
) {
  if (!clientId) {
    throw new JamendoError("Falta VITE_JAMENDO_CLIENT_ID (ver .env.example)");
  }
  const qs = new URLSearchParams({ client_id: clientId, format: "json", ...params });
  const res = await fetch(`${BASE}/${path}/?${qs}`);
  if (!res.ok) throw new JamendoError(`Jamendo HTTP ${res.status}`);
  const { headers, results } = await res.json();
  if (headers.status !== "success") {
    throw new JamendoError(headers.error_message || `Jamendo error ${headers.code}`);
  }
  return results;
}

// `d` = datos ya normalizados del padre (artista o álbum) para tracks anidados.
export function normalizeTrack(t, d = {}) {
  return {
    id: String(t.id),
    title: t.name,
    artistId: String(t.artist_id || d.artistId || ""),
    artistName: t.artist_name || d.artistName || "",
    albumId: String(t.album_id || d.albumId || ""),
    albumName: t.album_name || d.albumName || "",
    cover: t.album_image || t.image || d.cover || DEFAULT_COVER,
    src: t.audio,
    duration: Number(t.duration) || 0,
  };
}

export function normalizeArtist(a) {
  return {
    id: String(a.id),
    name: a.name,
    image: a.image || DEFAULT_COVER,
    website: a.website || "",
    shareUrl: a.shareurl || "",
  };
}

export function normalizeAlbum(a) {
  return {
    id: String(a.id),
    name: a.name,
    artistId: String(a.artist_id || ""),
    artistName: a.artist_name || "",
    cover: a.image || DEFAULT_COVER,
    releaseDate: a.releasedate || "",
    shareUrl: a.shareurl || "",
  };
}

const toTracks = (results, d) => results.map((t) => normalizeTrack(t, d));

export async function getPopularTracks({ limit = 20, offset = 0, order = "popularity_week" } = {}) {
  return toTracks(await request("tracks", { ...TRACK_PARAMS, order, limit, offset }));
}

export async function searchTracks(query, { limit = 20, offset = 0 } = {}) {
  return toTracks(await request("tracks", { ...TRACK_PARAMS, search: query, limit, offset }));
}

export async function getTrack(id) {
  const [t] = await request("tracks", { ...TRACK_PARAMS, id });
  return t ? normalizeTrack(t) : null;
}

export async function getArtist(id) {
  const [a] = await request("artists", { id, imagesize: 300 });
  return a ? normalizeArtist(a) : null;
}

export async function getArtistTracks(id, { limit = 50 } = {}) {
  return toTracks(
    await request("tracks", { ...TRACK_PARAMS, artist_id: id, order: "popularity_total", limit })
  );
}

// ponytail: orden por id (≈ orden de subida), no por `position`. Cambiar a /albums/tracks si importa.
export async function getAlbum(id) {
  const [[a], tracks] = await Promise.all([
    request("albums", { id, imagesize: 300 }),
    request("tracks", { ...TRACK_PARAMS, album_id: id, order: "id_asc", limit: 200 }),
  ]);
  if (!a) return null;
  const album = normalizeAlbum(a);
  return { ...album, tracks: toTracks(tracks, album) };
}

export async function getPlaylist(id) {
  const [p] = await request("playlists/tracks", { id, imagesize: 300 });
  if (!p) return null;
  return { id: String(p.id), name: p.name, userName: p.user_name || "", tracks: toTracks(p.tracks || []) };
}
