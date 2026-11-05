// Lógica pura de la cola. `order` es una permutación de índices de `queue`;
// `pos` es la posición actual dentro de `order` (-1 = sin canción).

export const REPEAT_MODES = ["off", "all", "one"];

export const identityOrder = (length) => Array.from({ length }, (_, i) => i);

// Fisher-Yates; la canción `first` queda al frente para que shuffle no la cambie.
export function shuffledOrder(length, first = -1, rng = Math.random) {
  const rest = identityOrder(length).filter((i) => i !== first);
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }
  return first >= 0 ? [first, ...rest] : rest;
}

// Devuelve la nueva posición, o null si no hay siguiente.
export function nextPos(pos, length, repeat) {
  if (pos + 1 < length) return pos + 1;
  return repeat === "all" && length > 0 ? 0 : null;
}

export function prevPos(pos, length, repeat) {
  if (pos > 0) return pos - 1;
  return repeat === "all" && length > 0 ? length - 1 : null;
}
