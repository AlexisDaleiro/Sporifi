import React from "react";

export default function Sidebar({ className }) {
  return (
    <aside className={className}>
      <div className="sidebar-header">
        <svg width="30" height="20" viewBox="0 0 113 113" fill="none">
          <circle cx="56.5" cy="56.5" r="56.5" fill="#1DB954" />
          <text
            x="50%"
            y="60%"
            textAnchor="middle"
            fill="white"
            fontSize="38"
            fontWeight="bold"
            dy=".3em"
          >
            S
          </text>
        </svg>
        <span className="sidebar-title">Sporifi</span>
      </div>
      <nav className="sidebar-nav">
        <a href="#" className="sidebar-link">
          <span>🏠</span> Inicio
        </a>
        <a href="#" className="sidebar-link">
          <span>🔍</span> Buscar
        </a>
        <a href="#" className="sidebar-link">
          <span>📚</span> Tu Biblioteca
        </a>
      </nav>
      <div className="sidebar-actions">
        <button className="sidebar-btn">Crear Playlist</button>
        <button className="sidebar-btn">Tus Favoritos</button>
      </div>
    </aside>
  );
}
