import React from "react";
import usePlayerStore from "../store/zustand";
import { Link, Links } from "react-router-dom";

export default function Home() {
  const { musicList, setTrack, currentTrack, isPlaying } = usePlayerStore();

  const handlePlayTrack = (track) => {
    setTrack(track);
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4">🎵 Sporifi - Tu Música Favorita</h1>
          <p className="text-center text-muted mb-5">
            Descubre y reproduce tu música favorita
          </p>
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
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x200/6c757d/ffffff?text=🎵";
                }}
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
