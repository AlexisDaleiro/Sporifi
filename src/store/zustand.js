import { create } from "zustand";

const usePlayerStore = create((set, get) => ({
  musicList: [], // se carga desde Jamendo (ver setMusicList)

  currentTrack: null, // No hay canción seleccionada inicialmente
  currentTrackIndex: -1, // Índice de la canción actual (-1 significa ninguna)
  isPlaying: false,
  volume: 1.0,
  trackInfo: {
    title: "Elige una cancion para reproducir",
    artist: "",
    cover: "/default-cover.svg",
  }, // 🔧 Info inicial

  setMusicList: (musicList) => set({ musicList }),

  setTrack: (track) => {
    const state = get();
    const trackIndex = state.musicList.findIndex((t) => t.id === track.id);

    set({
      currentTrack: track.src,
      currentTrackIndex: trackIndex,
      isPlaying: true,
      trackInfo: {
        title: track.title,
        artist: track.artistName,
        cover: track.cover,
      },
    });
  },

  togglePlay: () => {
    const state = get();
    // Solo permitir reproducir si hay una canción seleccionada
    if (state.currentTrack) {
      set({ isPlaying: !state.isPlaying });
    }
  },

  setVolume: (volume) => set({ volume }),

  nextTrack: () => {
    const state = get();
    if (state.currentTrackIndex >= 0 && state.musicList.length > 0) {
      const nextIndex = (state.currentTrackIndex + 1) % state.musicList.length;
      const nextTrack = state.musicList[nextIndex];
      get().setTrack(nextTrack);
    }
  },

  prevTrack: () => {
    const state = get();
    if (state.currentTrackIndex >= 0 && state.musicList.length > 0) {
      const prevIndex =
        (state.currentTrackIndex - 1 + state.musicList.length) %
        state.musicList.length;
      const prevTrack = state.musicList[prevIndex];
      get().setTrack(prevTrack);
    }
  },
}));

export default usePlayerStore;
