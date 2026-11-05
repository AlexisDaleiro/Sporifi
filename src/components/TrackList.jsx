import { Link } from "react-router-dom";
import usePlayback from "../hooks/usePlayback";
import formatTime from "../utils/formatTime";
import FavoriteButton from "./FavoriteButton";
import AddToPlaylist from "./AddToPlaylist";
import Icon from "./Icon";

// Lista de canciones reproducible. Con `onRemove` muestra un botón para quitar la canción.
export default function TrackList({ tracks, onRemove }) {
  const { isActive, toggle } = usePlayback(tracks);

  return (
    <ul className="list-group">
      {tracks.map((track, index) => {
        const active = isActive(track);
        return (
          <li key={track.id} className="list-group-item d-flex align-items-center gap-2 gap-md-3">
            <button
              className="btn btn-primary rounded-circle d-inline-flex align-items-center justify-content-center p-0 flex-shrink-0"
              style={{ width: 36, height: 36 }}
              onClick={() => toggle(index)}
              aria-label={`${active ? "Pausar" : "Reproducir"} ${track.title}`}
            >
              <Icon name={active ? "pause" : "play"} />
            </button>
            <img
              src={track.cover}
              alt=""
              width={40}
              height={40}
              loading="lazy"
              className="rounded flex-shrink-0 d-none d-sm-block"
              style={{ objectFit: "cover" }}
            />
            <div className="flex-grow-1 text-truncate">
              <div className="text-truncate">{track.title}</div>
              {track.artistId && (
                <Link to={`/artist/${track.artistId}`} className="small text-muted text-decoration-none">
                  {track.artistName}
                </Link>
              )}
            </div>
            <span className="text-muted small d-none d-sm-inline">{formatTime(track.duration)}</span>
            <FavoriteButton track={track} />
            <AddToPlaylist track={track} />
            {onRemove && (
              <button
                className="icon-btn"
                onClick={() => onRemove(track)}
                aria-label={`Quitar ${track.title} de la playlist`}
              >
                <Icon name="close" />
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
