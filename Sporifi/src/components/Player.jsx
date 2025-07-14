import ReactHowler from "react-howler";
import React, { useState, useRef, useEffect } from "react";
import usePlayerStore from "../store/zustand";

export default function Player() {
  const musicList = usePlayerStore((state) => state.musicList);
  const [seek, setSeek] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const howlerRef = useRef(null);
  const { currentTrack, isPlaying, volume, togglePlay, setVolume, trackInfo } =
    usePlayerStore();

  if (!currentTrack || !trackInfo) return null;

  useEffect(() => {
    let timer;
    if (isPlaying) {
      // Si está reproduciendo, asumimos que ya no está cargando
      setIsLoading(false);
      timer = setInterval(() => {
        if (howlerRef.current) {
          setSeek(howlerRef.current.seek());
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Reset loading state when track changes
  useEffect(() => {
    setIsLoading(false);
    setError(null);
  }, [currentTrack]);

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return "0:00";
    const min = Math.floor(secs / 60) || 0;
    const sec = Math.floor(secs % 60) || 0;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handleLoad = () => {
    setIsLoading(false);
    setError(null);
    if (howlerRef.current) {
      setDuration(howlerRef.current.duration());
    }
  };

  const handleLoadError = () => {
    setIsLoading(false);
    setError("Error loading audio file");
  };

  const handleSeek = (e) => {
    if (!duration) return;
    const rect = e.target.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newSeek = percent * duration;
    if (howlerRef.current) {
      howlerRef.current.seek(newSeek);
      setSeek(newSeek);
    }
  };

  const handleVolume = (e) => {
    setVolume(Number(e.target.value));
  };

  const handlePlay = () => {
    if (!isLoading) {
      setError(null);
      console.log("Current isPlaying state:", isPlaying);
      // Pequeño delay para asegurar que ReactHowler responda correctamente
      setTimeout(() => {
        togglePlay();
      }, 50);
    }
  };

  return (
    <div
      className="player-container bg-dark text-white d-flex flex-wrap align-items-center justify-content-between px-2 px-md-4 py-2 py-md-3 shadow-lg"
      style={{
        zIndex: 1050,
        width: "100%",
        left: 0,
        bottom: 0,
        position: "fixed",
      }}
    >
      {/* Song Info */}
      <div
        className="d-flex align-items-center flex-shrink-0"
        style={{ minWidth: 0 }}
      >
        <img
          src={trackInfo.cover}
          alt="Album Art"
          className="rounded me-2 me-md-3"
          style={{ width: "40px", height: "40px", objectFit: "cover" }}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/40/6c757d/ffffff?text=🎵";
          }}
        />
        <div className="text-truncate" style={{ maxWidth: 120 }}>
          <div className="fw-semibold text-truncate">{trackInfo.title}</div>
          <div className="small text-white-50 text-truncate">
            {trackInfo.artist}
          </div>
        </div>
      </div>

      {/* Player Controls */}
      <div
        className="d-flex flex-column align-items-center flex-grow-1 mx-2 mx-md-4"
        style={{ minWidth: 0 }}
      >
        <ReactHowler
          src={currentTrack}
          playing={isPlaying}
          volume={volume}
          loop={false}
          ref={howlerRef}
          onLoad={handleLoad}
          onLoadError={handleLoadError}
          onEnd={() => setSeek(0)}
        />

        <button
          onClick={handlePlay}
          className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: "40px", height: "40px" }}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : isPlaying ? (
            "⏸"
          ) : (
            "▶"
          )}
        </button>

        {error && <div className="text-danger small mt-1">{error}</div>}

        {/* Progress Bar */}
        <div className="d-flex align-items-center gap-1 gap-md-2 w-100 mt-1 mt-md-2">
          <span className="small text-muted">{formatTime(seek)}</span>
          <div
            className="progress flex-grow-1"
            style={{ height: "4px", cursor: "pointer", minWidth: 40 }}
            onClick={handleSeek}
          >
            <div
              className="progress-bar bg-success"
              style={{
                width: duration ? `${(seek / duration) * 100}%` : "0%",
              }}
            ></div>
          </div>
          <span className="small text-muted">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume & Extras */}
      <div className="d-flex align-items-center gap-2 gap-md-3 flex-shrink-0">
        <button
          className="btn btn-link text-decoration-none p-0 btn-player"
          style={{ color: "inherit" }}
        >
          <svg width="20" height="20" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3z" />
          </svg>
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolume}
          className="form-range"
          style={{ width: "72px", maxWidth: "20vw" }}
        />
        <button
          className="btn btn-link text-decoration-none p-0 btn-player"
          style={{ color: "inherit" }}
        >
          <svg width="20" height="20" fill="currentColor">
            <circle cx="10" cy="10" r="2" />
            <circle cx="16" cy="10" r="2" />
          </svg>
        </button>
      </div>

      {/* Estilos responsivos */}
      <style>{`
        @media (max-width: 576px) {
          .player-container {
            flex-direction: column;
            align-items: stretch;
            padding: 8px 4px;
          }
          .player-container > div {
            margin-bottom: 6px;
          }
        }
        
        .form-range::-webkit-slider-thumb {
          background-color: #0d6efd;
        }
        
        .form-range::-moz-range-thumb {
          background-color: #0d6efd;
        }
      `}</style>
    </div>
  );
}
