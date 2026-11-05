import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Player from "../components/Player.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { PageSkeleton } from "../components/Skeletons.jsx";

export default function MainLayout() {
  return (
    <div className="app-container">
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>
      <Sidebar className="sidebar" />
      <div className="main-column">
        <Navbar />
        <main id="main" tabIndex={-1}>
          <Suspense fallback={<PageSkeleton />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
      <Player />
    </div>
  );
}
