import usePlayerStore, { selectCurrentTrack } from "../store/zustand";

// Reproducir una lista: si la canción ya es la actual alterna play/pausa;
// si no, la lista pasa a ser la cola y arranca en esa canción.
export default function usePlayback(tracks) {
  const { playQueue, togglePlay, isPlaying } = usePlayerStore();
  const current = usePlayerStore(selectCurrentTrack);
  return {
    isActive: (track) => current?.id === track.id && isPlaying,
    toggle: (index) => (current?.id === tracks[index].id ? togglePlay() : playQueue(tracks, index)),
    playAll: () => playQueue(tracks, 0),
  };
}
