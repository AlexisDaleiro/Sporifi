import { useParams } from "react-router-dom";
import usePlayerStore, { selectCurrentTrack } from "../store/zustand";
import useFetch from "../hooks/useFetch";
import formatTime from "../utils/formatTime";
import { getArtist, getArtistTracks } from "../services/jamendo";

export default function Artist() {
  const { id } = useParams();
  const { playQueue, togglePlay, isPlaying } = usePlayerStore();
  const current = usePlayerStore(selectCurrentTrack);
  const { data, loading, error } = useFetch(
    () => Promise.all([getArtist(id), getArtistTracks(id)]),
    [id]
  );

  if (loading) return <p className="p-5">Cargando artista...</p>;
  if (error) return <p className="p-5 text-danger">No se pudo cargar el artista: {error.message}</p>;

  const [artist, tracks] = data;
  if (!artist) return <p className="p-5">Artista no encontrado.</p>;

  // La cola pasa a ser la lista del artista; si ya es la actual, alterna play/pausa.
  const play = (index) => {
    if (current?.id === tracks[index].id) togglePlay();
    else playQueue(tracks, index);
  };

  return (
    <div className="container-fluid">
      <div className="row p-5">
        <div className="col-md-4 mb-4">
          <img
            src={artist.image}
            alt={artist.name}
            className="img-fluid rounded"
            style={{ width: 300, height: 300, objectFit: "cover" }}
          />
        </div>
        <div className="col-md-8">
          <h2>{artist.name}</h2>
          {artist.shareUrl && (
            <p>
              <a href={artist.shareUrl} target="_blank" rel="noreferrer">
                Ver en Jamendo
              </a>
            </p>
          )}
          <h5 className="mt-4">Canciones populares</h5>
          {tracks.length === 0 && <p>Este artista no tiene canciones disponibles.</p>}
          <ul className="list-group">
            {tracks.map((track, i) => {
              const active = current?.id === track.id && isPlaying;
              return (
                <li key={track.id} className="list-group-item d-flex align-items-center gap-3">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => play(i)}
                    aria-label={`${active ? "Pausar" : "Reproducir"} ${track.title}`}
                  >
                    {active ? "⏸" : "▶"}
                  </button>
                  <img src={track.cover} alt="" width={40} height={40} style={{ objectFit: "cover" }} />
                  <span className="flex-grow-1 text-truncate">{track.title}</span>
                  <span className="text-muted small">{formatTime(track.duration)}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
