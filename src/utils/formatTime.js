export default function formatTime(secs) {
  if (!secs || Number.isNaN(secs)) return "0:00";
  const min = Math.floor(secs / 60);
  const sec = Math.floor(secs % 60);
  return `${min}:${String(sec).padStart(2, "0")}`;
}
