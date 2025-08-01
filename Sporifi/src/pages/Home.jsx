import React from "react";
import usePlayerStore from "../store/zustand";
import { Link, Links } from "react-router-dom";

export default function Home() {
  const { musicList, setTrack, currentTrack, isPlaying } = usePlayerStore();

  const handlePlayTrack = (track) => {
    setTrack(track);
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

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {musicList.map((track, index) => (
          <div key={index} className="col">
            <div className="card h-100 shadow-sm hover-shadow">
              <img
                src={track.cover}
                className="card-img-top"
                alt={`${track.title} cover`}
                style={{ height: "200px", objectFit: "cover" }}
                onError={(e) => {}}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-truncate">{track.title}</h5>
                <Link to={`/artist/${track.artist}`}>
                  <p className="card-text text-muted">{track.artist}</p>
                </Link>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => handlePlayTrack(track)}
                  disabled={currentTrack === track.src && isPlaying}
                >
                  {currentTrack === track.src && isPlaying ? (
                    <>
                      <span className="me-2">⏸</span>
                      Reproduciendo
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

      <style>{`
        .hover-shadow:hover {
          transform: translateY(-2px);
          transition: transform 0.2s ease-in-out;
        }
        
        .card {
          transition: all 0.2s ease-in-out;
        }
        
        .card:hover {
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </div>
  );
}
