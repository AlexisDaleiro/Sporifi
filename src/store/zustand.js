import { create } from "zustand";

const usePlayerStore = create((set, get) => ({
  musicList: [
    {
      src: "/src/assets/Charlie Puth - How Long.mp3",
      title: "How Long",
      artist: "Charlie Puth",
      cover: "/src/assets/charlieputh.jpg",
    },
    {
      src: "/src/assets/Barns Courtney - Mother Teresa.flac",
      title: "Mother Teresa",
      artist: "Barns Courtney",
      cover: "/src/assets/barns-courtney.jpg",
    },
    {
      src: "/src/assets/Linkin Park - CASTLE OF GLASS.flac",
      title: "Castle of Glass",
      artist: "Linkin Park",
      cover: "/src/assets/linkinpark.jpg",
    },
    {
      src: "/src/assets/The Heavy - How You Like Me Now.mp3",
      title: "How You Like Me Now",
      artist: "The Heavy",
      cover: "/src/assets/theheavy.jpg",
    },
  ],

  currentTrack: null, // No hay canción seleccionada inicialmente
  currentTrackIndex: -1, // Índice de la canción actual (-1 significa ninguna)
  isPlaying: false,
  volume: 1.0,
  trackInfo: {
    title: "Elige una cancion para reproducir",
    artist: "",
    cover: "/src/assets/negrofortnite.webp",
  }, // 🔧 Info inicial

  setTrack: (track) => {
    const state = get();
    const trackIndex = state.musicList.findIndex((t) => t.src === track.src);
    
    set({
      currentTrack: track.src,
      currentTrackIndex: trackIndex,
      isPlaying: true,
      trackInfo: {
        title: track.title,
        artist: track.artist,
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
      const prevIndex = (state.currentTrackIndex - 1 + state.musicList.length) % state.musicList.length;
      const prevTrack = state.musicList[prevIndex];
      get().setTrack(prevTrack);
    }
  },
}));

export default usePlayerStore;
