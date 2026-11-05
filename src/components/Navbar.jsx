import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useLibraryStore from "../store/library";
import Icon from "./Icon";

const MENU = [
  ["/", "Inicio"],
  ["/search", "Buscar"],
  ["/library", "Tu biblioteca"],
  ["/favorites", "Tus favoritos"],
  ["/premium", "Premium"],
  ["/installapp", "Instalar app"],
];
const SEARCH_DELAY = 350; // ms sin escribir antes de buscar
const itemClass = "list-group-item list-group-item-action";

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [params] = useSearchParams();
  const playlists = useLibraryStore((s) => s.playlists);
  const createPlaylist = useLibraryStore((s) => s.createPlaylist);
  const urlQuery = pathname === "/search" ? (params.get("q") ?? "") : "";
  const [text, setText] = useState(urlQuery);
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef(null);
  const timer = useRef(null);

  // La URL manda cuando no se está escribiendo (atrás/adelante, salir de /search).
  useEffect(() => {
    if (document.activeElement !== inputRef.current) setText(urlQuery);
  }, [urlQuery]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const goSearch = (value) => {
    const q = value.trim();
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`, { replace: pathname === "/search" });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => goSearch(value), SEARCH_DELAY);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearTimeout(timer.current);
    goSearch(text);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="topbar">
      <nav className="navbar" aria-label="Barra superior">
        <div className="container-fluid gap-3 flex-nowrap">
          <button
            type="button"
            className="icon-btn d-md-none"
            aria-label="Menú"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? "close" : "menu"} size={26} />
          </button>
          <Link to="/" className="flex-shrink-0 d-md-none" aria-label="Sporifi, ir al inicio">
            <img src="/logo.svg" width={36} height={36} alt="" />
          </Link>
          <form role="search" onSubmit={handleSubmit} className="flex-grow-1" style={{ maxWidth: 400 }}>
            <input
              ref={inputRef}
              type="search"
              value={text}
              onChange={handleChange}
              className="form-control search-input"
              placeholder="Buscar canciones, artistas, álbumes"
              aria-label="Buscar canciones, artistas y álbumes"
            />
          </form>
          <div className="d-none d-md-flex gap-3 ms-auto">
            <Link to="/premium" className="btn btn-primary rounded-pill px-3">
              Descubre premium
            </Link>
            <Link to="/installapp" className="btn btn-secondary rounded-pill px-3">
              Instalar app
            </Link>
          </div>
        </div>

        {menuOpen && (
          <div id="mobile-menu" className="d-md-none w-100 px-3 pb-3">
            <div className="list-group">
              {MENU.map(([to, label]) => (
                <NavLink key={to} to={to} end={to === "/"} className={itemClass} onClick={closeMenu}>
                  {label}
                </NavLink>
              ))}
              {playlists.map((p) => (
                <NavLink key={p.id} to={`/playlist/${p.id}`} className={`${itemClass} text-truncate`} onClick={closeMenu}>
                  {p.name}
                </NavLink>
              ))}
              <button
                type="button"
                className={`${itemClass} text-start`}
                onClick={() => {
                  closeMenu();
                  navigate(`/playlist/${createPlaylist()}`);
                }}
              >
                Crear playlist
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
