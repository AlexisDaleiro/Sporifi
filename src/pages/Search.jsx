import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { searchAlbums, searchArtists, searchTracks } from "../services/jamendo";
import Async from "../components/Async";
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
        <h2>Buscar</h2>
        <p className="text-muted">Escribe en el buscador de arriba para encontrar canciones, artistas y álbumes.</p>
      </div>
    );
  }

  const [tracks, artists, albums] = data ?? [[], [], []];
  const empty = !tracks.length && !artists.length && !albums.length;

  return (
    <div className="container-fluid p-4 p-md-5">
      <h2 className="mb-4">Resultados para &laquo;{query}&raquo;</h2>
      <Async loading={loading} error={error}>
        {empty ? (
          <p className="text-muted">No hay resultados. Prueba con otra búsqueda.</p>
        ) : (
          <>
            {tracks.length > 0 && (
              <section className="mb-5">
                <h4 className="mb-3">Canciones</h4>
                <TrackList tracks={tracks} />
              </section>
            )}
            {artists.length > 0 && (
              <section className="mb-5">
                <h4 className="mb-3">Artistas</h4>
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
                <h4 className="mb-3">Álbumes</h4>
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
