import { create } from "zustand";

const usePlayerStore = create((set) => ({
  musicList: [
    {
      src: "/src/assets/Charlie Puth - How Long.mp3",
      title: "How Long",
      artist: "Charlie Puth",
      cover: "https://via.placeholder.com/150/1e3c72/ffffff?text=CP",
    },
    {
      src: "/src/assets/Barns Courtney - Mother Teresa.flac",
      title: "Mother Teresa",
      artist: "Barns Courtney",
      cover: "https://via.placeholder.com/150/d86c24/ffffff?text=BC",
    },
    {
      src: "/src/assets/Linkin Park - CASTLE OF GLASS.flac",
      title: "Castle of Glass",
      artist: "Linkin Park",
      cover: "https://via.placeholder.com/150/2a5298/ffffff?text=LP",
    },
    {
      src: "/src/assets/The Heavy - How You Like Me Now.mp3",
      title: "How You Like Me Now",
      artist: "The Heavy",
      cover: "https://via.placeholder.com/150/6c757d/ffffff?text=TH",
    },
  ],

  currentTrack: "/src/assets/Charlie Puth - How Long.mp3", // 🔧 Canción inicial
  isPlaying: false,
  volume: 1.0,
  trackInfo: {
    title: "How Long",
    artist: "Charlie Puth",
    cover: "https://via.placeholder.com/150/1e3c72/ffffff?text=CP",
  }, // 🔧 Info inicial

  setTrack: (track) =>
    set({
      currentTrack: track.src,
      isPlaying: true,
      trackInfo: {
        title: track.title,
        artist: track.artist,
        cover: track.cover,
      },
    }),

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setVolume: (volume) => set({ volume }),
}));

export default usePlayerStore;
