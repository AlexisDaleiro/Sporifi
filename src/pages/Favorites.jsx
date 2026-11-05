import useLibraryStore from "../store/library";
import CollectionHeader from "../components/CollectionHeader";
import EmptyState from "../components/EmptyState";
import TrackList from "../components/TrackList";

export default function Favorites() {
  const favorites = useLibraryStore((s) => s.favorites);

  return (
    <div className="container-fluid p-4 p-md-5">
      <CollectionHeader title="Tus favoritos" tracks={favorites} />
      {favorites.length === 0 ? (
        <EmptyState icon="heart" title="Aún no tienes favoritos">
          Marca canciones con el corazón y aparecerán aquí.
        </EmptyState>
      ) : (
        <TrackList tracks={favorites} />
      )}
    </div>
  );
}
