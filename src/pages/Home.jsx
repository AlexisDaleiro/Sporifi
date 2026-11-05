import usePlayerStore, { selectCurrentTrack } from "../store/zustand";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getPopularTracks } from "../services/jamendo";

export default function Home() {
  const { playQueue, togglePlay, isPlaying } = usePlayerStore();
  const current = usePlayerStore(selectCurrentTrack);
  const { data: tracks, loading, error } = useFetch(() => getPopularTracks({ limit: 20 }), []);

  // La cola del player pasa a ser la lista visible; si ya es la actual, alterna play/pausa.
  const handlePlay = (track, index) => {
    if (current?.id === track.id) togglePlay();
    else playQueue(tracks, index);
  };

  return (
    <div className="container p-5 py-4">
      <div className="row">
        <div className="mb-3">
          <span>
            <button className="btn btn-secondary shadow-lg me-2 rounded-5">
              Todo
            </button>
          </span>
          <span>
            <button className="btn btn-secondary shadow-lg me-2 rounded-5">
              Musica
            </button>
          </span>
          <span>
            <button className="btn btn-secondary shadow-lg me-2 rounded-5">
              Podcast
            </button>
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="card mb-3" style={{ cursor: "pointer" }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src="https://picsum.photos/200/300"
                  className="img-fluid rounded-start"
                  alt="..."
                  style={{
                    maxHeight: "65px",
                    objectFit: "cover",
                    width: "80px",
                  }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Mix Diario 1</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card mb-3" style={{ cursor: "pointer" }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src="https://picsum.photos/200/300"
                  className="img-fluid rounded-start"
                  alt="..."
                  style={{
                    maxHeight: "65px",
                    objectFit: "cover",
                    width: "80px",
                  }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Mix Diario 2</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card mb-3" style={{ cursor: "pointer" }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src="https://picsum.photos/200/300"
                  className="img-fluid rounded-start"
                  alt="..."
                  style={{
                    maxHeight: "65px",
                    objectFit: "cover",
                    width: "80px",
                  }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Mix Diario 3</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card mb-3" style={{ cursor: "pointer" }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src="https://picsum.photos/200/300"
                  className="img-fluid rounded-start"
                  alt="..."
                  style={{
                    maxHeight: "65px",
                    objectFit: "cover",
                    width: "80px",
                  }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body ">
                  <h5 className="card-title ">Mix Diario 4</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <h4 className="text-start mt-3 "> Hecho para ti</h4>
          <p className="text-start mb-5 ">Usuario</p>
        </div>
      </div>
      {loading && <p>Cargando canciones...</p>}
      {error && <p className="text-danger">No se pudieron cargar las canciones: {error.message}</p>}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {(tracks ?? []).map((track, index) => (
          <div key={track.id} className="col">
            <div className="card h-100 shadow-sm hover-shadow">
              <img
                src={track.cover}
                className="card-img-top"
                alt={`${track.title} cover`}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-truncate">{track.title}</h5>
                <Link to={`/artist/${track.artistId}`}>
                  <p className="card-text text-muted">{track.artistName}</p>
                </Link>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => handlePlay(track, index)}
                >
                  {current?.id === track.id && isPlaying ? (
                    <>
                      <span className="me-2">⏸</span>
                      Pausar
                    </>
                  ) : (
                    <>
                      <span className="me-2">▶</span>
                      Reproducir
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
