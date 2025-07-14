import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Artist from "./pages/Artist.jsx";
import Home from "./pages/Home.jsx";
import Playlist from "./pages/Playlist.jsx";
import Search from "./pages/Search.jsx";
import NotFound from "./pages/NotFound.jsx";
import Player from "./components/Player.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/search" element={<Search />} />
          <Route path="/playlist/:id" element={<Playlist />} />
          <Route path="/artist" element={<Artist />} />
        </Routes>
      </main>
      <Player />
    </div>
  );
}

export default App;
