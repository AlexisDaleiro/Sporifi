import { useState } from "react";
import useFetch from "../hooks/useFetch";
import usePlayback from "../hooks/usePlayback";
import useLibraryStore from "../store/library";
import { getPopularAlbums, getPopularArtists, getPopularTracks } from "../services/jamendo";
import Async from "../components/Async";
import SongCard from "../components/SongCard";
import { AlbumCard, ArtistCard } from "../components/MediaCards";

// [etiqueta, tag de Jamendo]
const GENRES = [
  ["Todo", undefined],
  ["Rock", "rock"],
  ["Pop", "pop"],
  ["Electrónica", "electronic"],
  ["Hip hop", "hiphop"],
  ["Jazz", "jazz"],
  ["Ambient", "ambient"],
  ["Clásica", "classical"],
];
const RECENT_SHOWN = 6;

function SongGrid({ tracks, playback }) {
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
      {tracks.map((track, index) => (
        <div key={track.id} className="col">
          <SongCard track={track} active={playback.isActive(track)} onPlay={() => playback.toggle(index)} />
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [tag, setTag] = useState(undefined);
  const recent = useLibraryStore((s) => s.recent);
  const popular = useFetch(() => getPopularTracks({ limit: 12, tag }), [tag]);
  const artists = useFetch(() => getPopularArtists({ limit: 12 }), []);
  const albums = useFetch(() => getPopularAlbums({ limit: 12 }), []);
  const recentPlayback = usePlayback(recent);
  const popularPlayback = usePlayback(popular.data ?? []);

  return (
    <div className="container-fluid p-4 p-md-5">
      {recent.length > 0 && (
        <section className="mb-5">
          <h4 className="mb-3">Escuchado recientemente</h4>
          <SongGrid tracks={recent.slice(0, RECENT_SHOWN)} playback={recentPlayback} />
        </section>
      )}

      <section className="mb-5">
        <h4 className="mb-3">Canciones populares</h4>
        <div className="d-flex flex-wrap gap-2 mb-3" role="group" aria-label="Género">
          {GENRES.map(([label, value]) => (
            <button
              key={label}
              className={`btn btn-sm rounded-pill ${tag === value ? "btn-primary" : "btn-secondary"}`}
              aria-pressed={tag === value}
              onClick={() => setTag(value)}
            >
              {label}
            </button>
          ))}
        </div>
        <Async loading={popular.loading} error={popular.error}>
          {popular.data?.length ? (
            <SongGrid tracks={popular.data} playback={popularPlayback} />
          ) : (
            <p className="text-muted">No hay canciones para este género.</p>
          )}
        </Async>
      </section>

      <section className="mb-5">
        <h4 className="mb-3">Artistas populares</h4>
        <Async loading={artists.loading} error={artists.error}>
          <div className="row row-cols-2 row-cols-md-4 row-cols-xl-6 g-3">
            {artists.data?.map((artist) => (
              <div key={artist.id} className="col">
                <ArtistCard artist={artist} />
              </div>
            ))}
          </div>
        </Async>
      </section>

      <section className="mb-5">
        <h4 className="mb-3">Álbumes populares</h4>
        <Async loading={albums.loading} error={albums.error}>
          <div className="row row-cols-2 row-cols-md-4 row-cols-xl-6 g-3">
            {albums.data?.map((album) => (
              <div key={album.id} className="col">
                <AlbumCard album={album} />
              </div>
            ))}
          </div>
        </Async>
      </section>
    </div>
  );
}
