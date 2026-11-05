import { Link, useNavigate } from "react-router-dom";
import useLibraryStore from "../store/library";

function LibraryCard({ to, title, count }) {
  return (
    <Link to={to} className="text-decoration-none">
      <div className="card h-100 bg-dark text-white shadow-sm hover-shadow">
        <div className="card-body">
          <h5 className="card-title text-truncate">{title}</h5>
          <p className="card-text text-white-50 mb-0">
            {count} {count === 1 ? "canción" : "canciones"}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function Library() {
  const navigate = useNavigate();
  const favorites = useLibraryStore((s) => s.favorites);
  const playlists = useLibraryStore((s) => s.playlists);
  const createPlaylist = useLibraryStore((s) => s.createPlaylist);

  return (
    <div className="container-fluid p-4 p-md-5">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
        <h2 className="mb-0">Tu biblioteca</h2>
        <button className="btn btn-primary" onClick={() => navigate(`/playlist/${createPlaylist()}`)}>
          Nueva playlist
        </button>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
        <div className="col">
          <LibraryCard to="/favorites" title="♥ Tus favoritos" count={favorites.length} />
        </div>
        {playlists.map((p) => (
          <div key={p.id} className="col">
            <LibraryCard to={`/playlist/${p.id}`} title={p.name} count={p.tracks.length} />
          </div>
        ))}
      </div>
      {playlists.length === 0 && (
        <p className="text-muted mt-4">
          Aún no tienes playlists. Crea una o usa el botón ＋ junto a cualquier canción.
        </p>
      )}
    </div>
  );
}
