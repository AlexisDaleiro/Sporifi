export default function formatTime(secs) {
  if (!secs || Number.isNaN(secs)) return "0:00";
  const min = Math.floor(secs / 60);
  const sec = Math.floor(secs % 60);
  return `${min}:${String(sec).padStart(2, "0")}`;
}

// Duración total de una lista: "45 min" o "1 h 12 min".
export function formatTotal(secs) {
  const min = Math.round((secs || 0) / 60);
  return min < 60 ? `${min} min` : `${Math.floor(min / 60)} h ${min % 60} min`;
}
