import Navbar from "../components/Navbar";

import "../App.css";

import Player from "../components/Player.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="app-container">
      <button className="toggle-sidebar" onClick={toggleSidebar}>
        {isSidebarVisible ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="12" y2="12" />
            <line x1="18" y1="18" x2="12" y2="12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="6" y1="18" x2="12" y2="12" />
            <line x1="6" y1="6" x2="12" y2="12" />
          </svg>
        )}
      </button>

      <Sidebar className={`sidebar ${!isSidebarVisible ? "hidden" : ""}`} />

      <div
        className={`main-content ${!isSidebarVisible ? "sidebar-hidden" : ""}`}
      >
        <Navbar />
        <Outlet />
      </div>

      <Player />
    </div>
  );
}

export default MainLayout;
