import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getArtist, getArtistAlbums, getArtistTracks } from "../services/jamendo";
import Async from "../components/Async";
import CollectionHeader from "../components/CollectionHeader";
import TrackList from "../components/TrackList";
import { AlbumCard } from "../components/MediaCards";

export default function Artist() {
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    () => Promise.all([getArtist(id), getArtistTracks(id), getArtistAlbums(id)]),
    [id]
  );
  const [artist, tracks, albums] = data ?? [];

  return (
    <div className="container-fluid p-4 p-md-5">
      <Async loading={loading} error={error}>
        {!artist ? (
          <p>Artista no encontrado.</p>
        ) : (
          <>
            <CollectionHeader
              title={artist.name}
              cover={artist.image}
              tracks={tracks}
              stats={false}
              subtitle={
                artist.shareUrl && (
                  <a href={artist.shareUrl} target="_blank" rel="noreferrer">
                    Ver en Jamendo
                  </a>
                )
              }
            />
            <section className="mb-5">
              <h5 className="mb-3">Canciones populares</h5>
              {tracks.length ? <TrackList tracks={tracks} /> : <p className="text-muted">Este artista no tiene canciones disponibles.</p>}
            </section>
            {albums.length > 0 && (
              <section className="mb-5">
                <h5 className="mb-3">Álbumes</h5>
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
