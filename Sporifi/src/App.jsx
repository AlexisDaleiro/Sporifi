import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Artist from "./pages/Artist.jsx";
import Home from "./pages/Home.jsx";
import Playlist from "./pages/Playlist.jsx";
import Search from "./pages/Search.jsx";
import NotFound from "./pages/NotFound.jsx";
import Player from "./components/Player.jsx";
import Buypremium from "./pages/Buypremium.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { useState } from "react";

function App() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="app-container">
      <button className="toggle-sidebar" onClick={toggleSidebar}>
        {isSidebarVisible ? "≡" : "→"}
      </button>

      <Sidebar className={`sidebar ${!isSidebarVisible ? "hidden" : ""}`} />

      <div
        className={`main-content ${!isSidebarVisible ? "sidebar-hidden" : ""}`}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/search" element={<Search />} />
          <Route path="/playlist/:id" element={<Playlist />} />
          <Route path="/artist/:id" element={<Artist />} />
          <Route path="/premium" element={<Buypremium />} />
        </Routes>
      </div>

      <Player />
    </div>
  );
}

export default App;
