import { Link } from "react-router-dom";

export function AlbumCard({ album }) {
  return (
    <Link to={`/album/${album.id}`} className="text-decoration-none">
      <div className="card h-100 shadow-sm hover-shadow">
        <img
          src={album.cover}
          className="card-img-top"
          alt={`Portada de ${album.name}`}
          loading="lazy"
          style={{ aspectRatio: "1", objectFit: "cover" }}
        />
        <div className="card-body p-2">
          <div className="fw-semibold text-truncate">{album.name}</div>
          <div className="small text-muted text-truncate">{album.artistName}</div>
        </div>
      </div>
    </Link>
  );
}

export function ArtistCard({ artist }) {
  return (
    <Link to={`/artist/${artist.id}`} className="text-decoration-none text-center d-block">
      <img
        src={artist.image}
        alt=""
        loading="lazy"
        className="rounded-circle mb-2 shadow-sm"
        style={{ width: "100%", maxWidth: 140, aspectRatio: "1", objectFit: "cover" }}
      />
      <div className="fw-semibold text-truncate">{artist.name}</div>
      <div className="small text-muted">Artista</div>
    </Link>
  );
}
