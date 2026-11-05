import useLibraryStore from "../store/library";

export default function FavoriteButton({ track }) {
  const isFavorite = useLibraryStore((s) => s.favorites.some((t) => t.id === track.id));
  const toggleFavorite = useLibraryStore((s) => s.toggleFavorite);
  return (
    <button
      type="button"
      className={`btn btn-link p-0 fs-5 text-decoration-none ${isFavorite ? "text-danger" : "text-secondary"}`}
      onClick={() => toggleFavorite(track)}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? `Quitar ${track.title} de favoritos` : `Guardar ${track.title} en favoritos`}
    >
      {isFavorite ? "♥" : "♡"}
    </button>
  );
}
