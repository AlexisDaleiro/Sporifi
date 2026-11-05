import usePlayback from "../hooks/usePlayback";
import { formatTotal } from "../utils/formatTime";
import Icon from "./Icon";

// Encabezado de álbum, playlist, favoritos o artista. `children` = acciones extra junto al botón.
// Con `stats={false}` oculta el conteo (cuando la lista cargada es solo una parte).
export default function CollectionHeader({ title, subtitle, cover, tracks, stats = true, children }) {
  const { playAll } = usePlayback(tracks);
  const total = tracks.reduce((sum, t) => sum + t.duration, 0);

  return (
    <div className="d-flex flex-wrap align-items-end gap-4 mb-4">
      {cover && (
        <img
          src={cover}
          alt={`Portada de ${title}`}
          width={200}
          height={200}
          className="rounded shadow-sm"
          style={{ objectFit: "cover", maxWidth: "100%" }}
        />
      )}
      <div>
        <h2 className="mb-1">{title}</h2>
        {subtitle && <div className="text-muted mb-1">{subtitle}</div>}
        {stats && (
          <div className="text-muted small mb-2">
            {tracks.length} {tracks.length === 1 ? "canción" : "canciones"} {"·"} {formatTotal(total)}
          </div>
        )}
        <div className="d-flex flex-wrap align-items-center gap-2 mt-2">
          <button className="btn btn-primary d-inline-flex align-items-center gap-2" onClick={playAll} disabled={tracks.length === 0}>
            <Icon name="play" /> Reproducir todo
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}
