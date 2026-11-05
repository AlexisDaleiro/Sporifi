import { NavLink, useNavigate } from "react-router-dom";
import useLibraryStore from "../store/library";

const linkClass = ({ isActive }) => `sidebar-link${isActive ? " active" : ""}`;

export default function Sidebar({ className }) {
  const navigate = useNavigate();
  const playlists = useLibraryStore((s) => s.playlists);
  const createPlaylist = useLibraryStore((s) => s.createPlaylist);

  return (
    <aside className={className}>
      <div className="sidebar-header">
        <img src="/logo.svg" width={30} height={30} alt="" />
        <span className="sidebar-title">Sporifi</span>
      </div>
      <nav className="sidebar-nav" aria-label="Principal">
        <NavLink to="/" end className={linkClass}>
          <span aria-hidden="true">🏠</span> Inicio
        </NavLink>
        <NavLink to="/search" className={linkClass}>
          <span aria-hidden="true">🔍</span> Buscar
        </NavLink>
        <NavLink to="/library" end className={linkClass}>
          <span aria-hidden="true">📚</span> Tu biblioteca
        </NavLink>
        <NavLink to="/favorites" className={linkClass}>
          <span aria-hidden="true">♥</span> Tus favoritos
        </NavLink>
      </nav>
      <div className="sidebar-actions">
        <button className="sidebar-btn" onClick={() => navigate(`/playlist/${createPlaylist()}`)}>
          Crear playlist
        </button>
      </div>
      {playlists.length > 0 && (
        <nav className="sidebar-nav sidebar-playlists" aria-label="Tus playlists">
          {playlists.map((p) => (
            <NavLink key={p.id} to={`/playlist/${p.id}`} className={linkClass}>
              <span className="text-truncate">{p.name}</span>
            </NavLink>
          ))}
        </nav>
      )}
      <p className="sidebar-credit">
        Música vía{" "}
        <a href="https://www.jamendo.com" target="_blank" rel="noreferrer">
          Jamendo
        </a>
      </p>
    </aside>
  );
}
