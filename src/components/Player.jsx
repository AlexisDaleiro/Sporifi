import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import usePlayerStore, { selectCurrentTrack } from "../store/zustand";
import useLibraryStore from "../store/library";
import { nextPos } from "../store/queue";
import formatTime from "../utils/formatTime";

const MAX_CONSECUTIVE_FAILURES = 3; // canciones rotas seguidas antes de parar
const SEEK_STEP = 5; // segundos por flecha del teclado
const RESTART_AFTER = 3; // "anterior" reinicia la canción si ya pasaron estos segundos
const DEFAULT_COVER = "/default-cover.svg";

const REPEAT_LABELS = {
  off: "Repetir: desactivado",
  all: "Repetir: toda la cola",
  one: "Repetir: una canción",
};

// Mueve la cola y avisa si realmente cambió de canción (con 1 sola canción y repeat all no cambia).
function advance(direction) {
  const current = () => selectCurrentTrack(usePlayerStore.getState())?.id;
  const before = current();
  const moved = usePlayerStore.getState()[direction]();
  return { moved, changed: moved && current() !== before };
}

function goNext(audio) {
  const { moved, changed } = advance("next");
  if (moved && !changed && audio) {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }
  return moved;
}

function goPrev(audio) {
  if (audio && audio.currentTime <= RESTART_AFTER && advance("prev").changed) return;
  if (audio) audio.currentTime = 0;
}

function seekBy(audio, delta) {
  if (audio && Number.isFinite(audio.duration)) {
    audio.currentTime = Math.min(audio.duration, Math.max(0, audio.currentTime + delta));
  }
}

export default function Player() {
  const {
    pos, order, isPlaying, volume, muted, shuffle, repeat,
    togglePlay, setPlaying, setVolume, toggleMute, toggleShuffle, cycleRepeat,
  } = usePlayerStore();
  const track = usePlayerStore(selectCurrentTrack);
  const src = track?.src ?? null;

  const audioRef = useRef(null);
  const failures = useRef(0); // canciones rotas seguidas
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | loading | ready | error
  const [message, setMessage] = useState(null);

  const canNext = nextPos(pos, order.length, repeat) !== null;

  // Play/pausa del store -> elemento <audio>.
  useEffect(() => {
    const audio = audioRef.current;
    if (!src) return;
    if (isPlaying) {
      audio.play().catch((err) => {
        if (err.name === "NotAllowedError") setPlaying(false); // autoplay bloqueado
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, src, setPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
    audioRef.current.muted = muted;
  }, [volume, muted]);

  // Atajos: espacio = play/pausa, flechas = ±5 s (no cuando se escribe o hay un control enfocado).
  useEffect(() => {
    const onKey = (e) => {
      if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target;
      if (["INPUT", "TEXTAREA", "SELECT", "BUTTON", "A"].includes(t.tagName) || t.isContentEditable) return;
      if (e.code === "Space") {
        e.preventDefault();
        usePlayerStore.getState().togglePlay();
      } else if (e.code === "ArrowRight") seekBy(audioRef.current, SEEK_STEP);
      else if (e.code === "ArrowLeft") seekBy(audioRef.current, -SEEK_STEP);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Media Session: teclas multimedia y controles del sistema operativo.
  useEffect(() => {
    const ms = navigator.mediaSession;
    if (!ms) return;
    const actions = {
      play: () => usePlayerStore.getState().setPlaying(true),
      pause: () => usePlayerStore.getState().setPlaying(false),
      previoustrack: () => goPrev(audioRef.current),
      nexttrack: () => goNext(audioRef.current),
      seekto: (d) => {
        if (audioRef.current && d.seekTime != null) audioRef.current.currentTime = d.seekTime;
      },
    };
    for (const [name, fn] of Object.entries(actions)) {
      try {
        ms.setActionHandler(name, fn);
      } catch {
        // acción no soportada por este navegador
      }
    }
    return () => {
      for (const name of Object.keys(actions)) {
        try {
          ms.setActionHandler(name, null);
        } catch {
          // acción no soportada por este navegador
        }
      }
    };
  }, []);

  useEffect(() => {
    const ms = navigator.mediaSession;
    if (!ms) return;
    ms.metadata = track
      ? new MediaMetadata({
          title: track.title,
          artist: track.artistName,
          album: track.albumName,
          artwork: [{ src: track.cover, sizes: "300x300" }],
        })
      : null;
  }, [track]);

  useEffect(() => {
    if (navigator.mediaSession) navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
  }, [isPlaying]);

  // Canción rota: salta a la siguiente (hasta MAX_CONSECUTIVE_FAILURES seguidas) o se detiene.
  const fail = (failed) => {
    if (selectCurrentTrack(usePlayerStore.getState())?.id !== failed.id) return; // ya cambió
    failures.current += 1;
    setStatus("error");
    const base = `No se pudo reproducir «${failed.title}».`;
    const canSkip =
      usePlayerStore.getState().isPlaying &&
      failures.current < MAX_CONSECUTIVE_FAILURES &&
      advance("next").changed;
    if (canSkip) {
      setMessage(`${base} Paso a la siguiente.`);
    } else {
      setPlaying(false);
      setMessage(base);
    }
  };

  const handleEnded = () => {
    if (!goNext(audioRef.current)) setPlaying(false);
  };

  const handlePause = (e) => {
    // Pausa que no vino de la app (auriculares, sistema): se refleja en el store.
    const a = e.currentTarget;
    if (a.readyState > 0 && !a.ended) setPlaying(false);
  };

  const handleSeek = (e) => {
    const t = Number(e.target.value);
    audioRef.current.currentTime = t;
    setTime(t);
  };

  const loading = isPlaying && status === "loading";

  return (
    <div
      className="player-container bg-dark text-white d-flex flex-wrap align-items-center justify-content-between px-2 px-md-4 py-2 py-md-3 shadow-lg"
      style={{ zIndex: 1050, width: "100%", left: 0, bottom: 0, position: "fixed" }}
    >
      <audio
        ref={audioRef}
        src={src ?? undefined}
        preload="metadata"
        loop={repeat === "one"}
        onLoadStart={() => {
          setStatus("loading");
          setTime(0);
          setDuration(track?.duration ?? 0);
        }}
        onLoadedMetadata={(e) => {
          if (Number.isFinite(e.currentTarget.duration)) setDuration(e.currentTarget.duration);
        }}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onWaiting={() => setStatus("loading")}
        onPlaying={() => {
          setStatus("ready");
          setMessage(null);
          failures.current = 0;
          if (track) useLibraryStore.getState().addRecent(track);
        }}
        onPause={handlePause}
        onEnded={handleEnded}
        onError={() => track && fail(track)}
      />

      {/* Canción actual */}
      <div className="d-flex align-items-center flex-shrink-0" style={{ minWidth: 0 }}>
        <img
          src={track?.cover ?? DEFAULT_COVER}
          alt=""
          className="rounded me-2 me-md-3"
          style={{ width: "40px", height: "40px", objectFit: "cover" }}
          onError={(e) => {
            if (!e.currentTarget.src.endsWith(DEFAULT_COVER)) e.currentTarget.src = DEFAULT_COVER;
          }}
        />
        <div className="text-truncate" style={{ maxWidth: 160 }}>
          <div className="fw-semibold text-truncate">{track ? track.title : "Elige una canción"}</div>
          <div className="small text-white-50 text-truncate">
            {track && (
              <Link to={`/artist/${track.artistId}`} className="text-white-50 text-decoration-none">
                {track.artistName}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Controles y progreso */}
      <div className="d-flex flex-column align-items-center flex-grow-1 mx-2 mx-md-4" style={{ minWidth: 0 }}>
        <div className="d-flex align-items-center gap-2 mb-1">
          <button
            onClick={toggleShuffle}
            className={`btn btn-sm rounded-circle ${shuffle ? "btn-light" : "btn-outline-light"}`}
            style={{ width: "32px", height: "32px" }}
            aria-label="Aleatorio"
            aria-pressed={shuffle}
            title="Aleatorio"
          >
            🔀
          </button>
          <button
            onClick={() => goPrev(audioRef.current)}
            className="btn btn-outline-light btn-sm rounded-circle"
            style={{ width: "32px", height: "32px" }}
            disabled={!track}
            aria-label="Anterior"
          >
            ⏮
          </button>
          <button
            onClick={togglePlay}
            className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "40px", height: "40px" }}
            disabled={!track}
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-label="Cargando" />
            ) : isPlaying ? (
              "⏸"
            ) : (
              "▶"
            )}
          </button>
          <button
            onClick={() => goNext(audioRef.current)}
            className="btn btn-outline-light btn-sm rounded-circle"
            style={{ width: "32px", height: "32px" }}
            disabled={!track || !canNext}
            aria-label="Siguiente"
          >
            ⏭
          </button>
          <button
            onClick={cycleRepeat}
            className={`btn btn-sm rounded-circle ${repeat === "off" ? "btn-outline-light" : "btn-light"}`}
            style={{ width: "32px", height: "32px" }}
            aria-label={REPEAT_LABELS[repeat]}
            aria-pressed={repeat !== "off"}
            title={REPEAT_LABELS[repeat]}
          >
            {repeat === "one" ? "🔂" : "🔁"}
          </button>
        </div>

        {message && (
          <div className="text-warning small" role="status">
            {message}
          </div>
        )}

        <div className="d-flex align-items-center gap-1 gap-md-2 w-100 mt-1">
          <span className="small text-white-50">{formatTime(time)}</span>
          <input
            type="range"
            className="form-range flex-grow-1"
            min={0}
            max={duration || 0}
            step={0.1}
            value={Math.min(time, duration || 0)}
            onChange={handleSeek}
            disabled={!track || !duration}
            aria-label="Progreso de la canción"
          />
          <span className="small text-white-50">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volumen */}
      <div className="d-flex align-items-center gap-2 gap-md-3 flex-shrink-0">
        <button
          onClick={toggleMute}
          className="btn btn-link text-decoration-none p-0 btn-player"
          style={{ color: "inherit" }}
          aria-label={muted ? "Activar sonido" : "Silenciar"}
          aria-pressed={muted}
        >
          {muted || volume === 0 ? "🔇" : "🔊"}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={muted ? 0 : volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="form-range"
          style={{ width: "72px", maxWidth: "20vw" }}
          aria-label="Volumen"
        />
      </div>
    </div>
  );
}
