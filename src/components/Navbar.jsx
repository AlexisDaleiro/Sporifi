import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";

const MENU = [
  ["/", "Inicio"],
  ["/search", "Buscar"],
  ["/library", "Tu biblioteca"],
  ["/favorites", "Tus favoritos"],
  ["/premium", "Premium"],
  ["/installapp", "Instalar app"],
];
const SEARCH_DELAY = 350; // ms sin escribir antes de buscar

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [params] = useSearchParams();
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

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid gap-3 flex-nowrap">
        <button
          type="button"
          className="btn btn-outline-light d-md-none"
          aria-label="Menú"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          ☰
        </button>
        <Link to="/" className="flex-shrink-0 ms-md-5" aria-label="Sporifi, ir al inicio">
          <img src="/logo.svg" width={40} height={40} alt="" />
        </Link>
        <form role="search" onSubmit={handleSubmit} className="flex-grow-1" style={{ maxWidth: 400 }}>
          <input
            ref={inputRef}
            type="search"
            value={text}
            onChange={handleChange}
            className="form-control bg-dark text-white border-secondary"
            placeholder="Buscar canciones, artistas, álbumes"
            aria-label="Buscar canciones, artistas y álbumes"
          />
        </form>
        <div className="d-none d-md-flex gap-3 ms-auto">
          <Link to="/premium" className="btn btn-primary px-3 rounded-5">
            Descubre premium
          </Link>
          <Link to="/installapp" className="btn btn-secondary px-3 rounded-5">
            Instalar app
          </Link>
        </div>
      </div>

      {menuOpen && (
        <div className="d-md-none w-100 px-3 pb-3">
          <div className="list-group">
            {MENU.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className="list-group-item list-group-item-action bg-dark text-white border-secondary"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
