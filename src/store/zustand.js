import { create } from "zustand";
import { persist } from "zustand/middleware";
import { REPEAT_MODES, identityOrder, nextPos, prevPos, shuffledOrder } from "./queue.js";

const usePlayerStore = create(
  persist(
    (set, get) => ({
      queue: [], // Track[] en el orden original
      order: [], // índices de queue en el orden de reproducción (cambia con shuffle)
      pos: -1, // posición actual dentro de order
      isPlaying: false,
      volume: 1,
      muted: false,
      shuffle: false,
      repeat: "off", // "off" | "all" | "one"

      playQueue: (tracks, startIndex = 0) => {
        const { shuffle } = get();
        set({
          queue: tracks,
          order: shuffle ? shuffledOrder(tracks.length, startIndex) : identityOrder(tracks.length),
          pos: tracks.length === 0 ? -1 : shuffle ? 0 : startIndex,
          isPlaying: tracks.length > 0,
        });
      },

      togglePlay: () => {
        if (get().pos >= 0) set((s) => ({ isPlaying: !s.isPlaying }));
      },
      setPlaying: (isPlaying) => set({ isPlaying }),

      // Avanzan/retroceden en la cola. Devuelven false si no hay a dónde ir (no cambian nada).
      next: () => {
        const { pos, order, repeat } = get();
        const p = nextPos(pos, order.length, repeat);
        if (p === null) return false;
        set({ pos: p, isPlaying: true });
        return true;
      },
      prev: () => {
        const { pos, order, repeat } = get();
        const p = prevPos(pos, order.length, repeat);
        if (p === null) return false;
        set({ pos: p, isPlaying: true });
        return true;
      },

      toggleShuffle: () =>
        set((s) => {
          const shuffle = !s.shuffle;
          const current = s.order[s.pos] ?? -1; // índice en queue de la canción actual
          const order = shuffle ? shuffledOrder(s.queue.length, current) : identityOrder(s.queue.length);
          // sin shuffle, el índice en queue es la posición; con shuffle la actual va primera
          return { shuffle, order, pos: current < 0 ? -1 : shuffle ? 0 : current };
        }),
      cycleRepeat: () =>
        set((s) => ({ repeat: REPEAT_MODES[(REPEAT_MODES.indexOf(s.repeat) + 1) % REPEAT_MODES.length] })),

      setVolume: (volume) => set({ volume, muted: false }),
      toggleMute: () => set((s) => ({ muted: !s.muted })),
    }),
    {
      name: "sporifi-player",
      version: 1,
      // isPlaying no se persiste: el navegador bloquea el autoplay al recargar.
      partialize: ({ queue, order, pos, volume, muted, shuffle, repeat }) => ({
        queue, order, pos, volume, muted, shuffle, repeat,
      }),
    }
  )
);

export const selectCurrentTrack = (s) => s.queue[s.order[s.pos]] ?? null;

export default usePlayerStore;
