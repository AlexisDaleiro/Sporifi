import { create } from "zustand";

const usePlayerStore = create((set) => ({
  musicList: [
    {
      src: "src/assets/Charlie Puth - How Long.mp3",
      title: "Charlie Puth - How Long",
      artist: "Charlie Puth",
      cover: "src/assets/cover.jpg",
    },
    {
      src: "src/assets/Barns Courtney - Mother Teresa.flac",
      title: "Barns Courtney - Mother Teresa",
      artist: "Barns Courtney",
      cover: "src/assets/cover.jpg",
    },
  ],

  currentTrack: track.src,
  isPlaying: true,
  volume: 1.0,
  trackInfo: {
    title: track.title,
    artist: track.artist,
    cover: track.cover,
  },
  setTrack: (track) => set({ currentTrack: track, isPlaying: true }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setVolume: (volume) => set({ volume }),
}));

export default usePlayerStore;
