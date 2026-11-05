import useLibraryStore from "../store/library";
import CollectionHeader from "../components/CollectionHeader";
import TrackList from "../components/TrackList";

export default function Favorites() {
  const favorites = useLibraryStore((s) => s.favorites);

  return (
    <div className="container-fluid p-4 p-md-5">
      <CollectionHeader title="Tus favoritos" tracks={favorites} />
      {favorites.length === 0 ? (
        <p className="text-muted">Marca canciones con el corazón y aparecerán aquí.</p>
      ) : (
        <TrackList tracks={favorites} />
      )}
    </div>
  );
}
