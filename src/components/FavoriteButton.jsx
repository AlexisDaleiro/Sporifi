import useLibraryStore from "../store/library";
import Icon from "./Icon";

export default function FavoriteButton({ track }) {
  const isFavorite = useLibraryStore((s) => s.favorites.some((t) => t.id === track.id));
  const toggleFavorite = useLibraryStore((s) => s.toggleFavorite);
  return (
    <button
      type="button"
      className={`icon-btn ${isFavorite ? "text-danger" : ""}`}
      onClick={() => toggleFavorite(track)}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? `Quitar ${track.title} de favoritos` : `Guardar ${track.title} en favoritos`}
    >
      <Icon name={isFavorite ? "heartFilled" : "heart"} />
    </button>
  );
}
