import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import Icon from "./Icon";

export default function SongCard({ track, active, onPlay }) {
  return (
    <div className="card h-100 shadow-sm hover-shadow">
      <img
        src={track.cover}
        className="card-img-top"
        alt={`Portada de ${track.title}`}
        loading="lazy"
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-2">
          <h3 className="h5 card-title text-truncate mb-1">{track.title}</h3>
          <FavoriteButton track={track} />
        </div>
        {track.artistId ? (
          <Link to={`/artist/${track.artistId}`} className="card-text text-muted mb-3 text-truncate">
            {track.artistName}
          </Link>
        ) : (
          <p className="card-text text-muted mb-3">{track.artistName}</p>
        )}
        <button className="btn btn-primary mt-auto d-flex align-items-center justify-content-center gap-2" onClick={onPlay}>
          <Icon name={active ? "pause" : "play"} />
          {active ? "Pausar" : "Reproducir"}
        </button>
      </div>
    </div>
  );
}
