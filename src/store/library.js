import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_RECENT = 20;

// randomUUID solo existe en contextos seguros (https/localhost).
const newId = () =>
  globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;

// Favoritos, playlists propias y recientes. Se guardan las canciones completas
// (no solo el id) para mostrarlas sin volver a pedirlas a Jamendo.
const useLibraryStore = create(
  persist(
    (set, get) => ({
      favorites: [], // Track[], la más nueva primero
      playlists: [], // { id, name, tracks: Track[] }[]
      recent: [], // Track[], la más reciente primero

      toggleFavorite: (track) =>
        set((s) => ({
          favorites: s.favorites.some((t) => t.id === track.id)
            ? s.favorites.filter((t) => t.id !== track.id)
            : [track, ...s.favorites],
        })),

      // Devuelve el id de la playlist creada.
      createPlaylist: (name, tracks = []) => {
        const id = newId();
        const finalName = name?.trim() || `Playlist ${get().playlists.length + 1}`;
        set((s) => ({ playlists: [...s.playlists, { id, name: finalName, tracks }] }));
        return id;
      },
      renamePlaylist: (id, name) => {
        const finalName = name.trim();
        if (!finalName) return;
        set((s) => ({ playlists: s.playlists.map((p) => (p.id === id ? { ...p, name: finalName } : p)) }));
      },
      deletePlaylist: (id) => set((s) => ({ playlists: s.playlists.filter((p) => p.id !== id) })),
      addToPlaylist: (id, track) =>
        set((s) => ({
          playlists: s.playlists.map((p) =>
            p.id !== id || p.tracks.some((t) => t.id === track.id) ? p : { ...p, tracks: [...p.tracks, track] }
          ),
        })),
      removeFromPlaylist: (id, trackId) =>
        set((s) => ({
          playlists: s.playlists.map((p) =>
            p.id === id ? { ...p, tracks: p.tracks.filter((t) => t.id !== trackId) } : p
          ),
        })),

      addRecent: (track) => {
        if (get().recent[0]?.id === track.id) return; // reanudar la misma no reescribe nada
        set((s) => ({ recent: [track, ...s.recent.filter((t) => t.id !== track.id)].slice(0, MAX_RECENT) }));
      },
    }),
    { name: "sporifi-library", version: 1 }
  )
);

export default useLibraryStore;
