import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { searchAlbums, searchArtists, searchTracks } from "../services/jamendo";
import Async from "../components/Async";
import EmptyState from "../components/EmptyState";
import { ListSkeleton } from "../components/Skeletons";
import TrackList from "../components/TrackList";
import { AlbumCard, ArtistCard } from "../components/MediaCards";

export default function Search() {
  const [params] = useSearchParams();
  const query = (params.get("q") ?? "").trim();
  const { data, loading, error } = useFetch(
    () =>
      query
        ? Promise.all([searchTracks(query, { limit: 20 }), searchArtists(query, { limit: 6 }), searchAlbums(query, { limit: 6 })])
        : Promise.resolve(null),
    [query]
  );

  if (!query) {
    return (
      <div className="container-fluid p-4 p-md-5">
        <EmptyState icon="search" title="Busca en Sporifi">
          Escribe en el buscador de arriba para encontrar canciones, artistas y álbumes.
        </EmptyState>
      </div>
    );
  }

  const [tracks, artists, albums] = data ?? [[], [], []];
  const empty = !tracks.length && !artists.length && !albums.length;

  return (
    <div className="container-fluid p-4 p-md-5">
      <h2 className="mb-4">Resultados para &laquo;{query}&raquo;</h2>
      <Async loading={loading} error={error} skeleton={<ListSkeleton />}>
        {empty ? (
          <EmptyState icon="search" title="Sin resultados">
            Prueba con otra búsqueda.
          </EmptyState>
        ) : (
          <>
            {tracks.length > 0 && (
              <section className="mb-5">
                <h3 className="h4 mb-3">Canciones</h3>
                <TrackList tracks={tracks} />
              </section>
            )}
            {artists.length > 0 && (
              <section className="mb-5">
                <h3 className="h4 mb-3">Artistas</h3>
                <div className="row row-cols-2 row-cols-md-4 row-cols-xl-6 g-3">
                  {artists.map((artist) => (
                    <div key={artist.id} className="col">
                      <ArtistCard artist={artist} />
                    </div>
                  ))}
                </div>
              </section>
            )}
            {albums.length > 0 && (
              <section className="mb-5">
                <h3 className="h4 mb-3">Álbumes</h3>
                <div className="row row-cols-2 row-cols-md-4 row-cols-xl-6 g-3">
                  {albums.map((album) => (
                    <div key={album.id} className="col">
                      <AlbumCard album={album} />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </Async>
    </div>
  );
}
