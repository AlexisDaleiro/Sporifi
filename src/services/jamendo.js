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

// Verificado 2026-11-05: /tracks con filtros u orden devuelve [] con status "success"
// entre ~30% y ~55% de las veces. Se reintenta; una lista vacía legítima gasta `attempts` pedidos.
// ponytail: reintento inmediato y sin backoff. Quitar si Jamendo lo corrige.
export async function requestNonEmpty(path, params, clientId, attempts = 5) {
  let results = [];
  for (let i = 0; i < attempts && results.length === 0; i++) {
    results = await request(path, params, clientId);
  }
  return results;
}

const toTracks = (results, d) => results.map((t) => normalizeTrack(t, d));

// `tag` filtra por género (fuzzytags de Jamendo: rock, pop, electronic, hiphop, jazz...).
export async function getPopularTracks({ limit = 20, offset = 0, order = "popularity_week", tag } = {}) {
  const params = { ...TRACK_PARAMS, order, limit, offset, ...(tag && { fuzzytags: tag }) };
  return toTracks(await requestNonEmpty("tracks", params));
}

export async function searchTracks(query, { limit = 20, offset = 0 } = {}) {
  return toTracks(await requestNonEmpty("tracks", { ...TRACK_PARAMS, search: query, limit, offset }));
}

export async function getArtist(id) {
  const [a] = await request("artists", { id });
  return a ? normalizeArtist(a) : null;
}

export async function searchArtists(query, { limit = 12 } = {}) {
  const results = await request("artists", { namesearch: query, order: "popularity_total", limit });
  return results.map(normalizeArtist);
}

export async function getPopularArtists({ limit = 12 } = {}) {
  const results = await request("artists", { order: "popularity_week", limit });
  return results.map(normalizeArtist);
}

export async function searchAlbums(query, { limit = 12 } = {}) {
  const results = await request("albums", { namesearch: query, order: "popularity_total", limit, imagesize: 300 });
  return results.map(normalizeAlbum);
}

export async function getPopularAlbums({ limit = 12 } = {}) {
  const results = await request("albums", { order: "popularity_week", limit, imagesize: 300 });
  return results.map(normalizeAlbum);
}

export async function getArtistAlbums(artistId, { limit = 20 } = {}) {
  const results = await request("albums", {
    artist_id: artistId, order: "releasedate_desc", limit, imagesize: 300,
  });
  return results.map(normalizeAlbum);
}

// No usar artists/tracks: devuelve todo el catálogo por id (hasta 350 KB) e ignora limit/order.
export async function getArtistTracks(id, { limit = 50 } = {}) {
  return toTracks(
    await requestNonEmpty("tracks", { ...TRACK_PARAMS, artist_id: id, order: "popularity_total", limit })
  );
}

// albums/tracks es estable pero devuelve los tracks desordenados: se ordena por `position`.
export async function getAlbum(id) {
  const [a] = await request("albums/tracks", { id, ...TRACK_PARAMS });
  if (!a) return null;
  const album = normalizeAlbum(a);
  const tracks = [...(a.tracks || [])].sort((x, y) => Number(x.position) - Number(y.position));
  return { ...album, tracks: toTracks(tracks, album) };
}
