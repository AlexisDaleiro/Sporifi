import { Route, Routes } from "react-router-dom";
import "./App.css";
import Album from "./pages/Album.jsx";
import Artist from "./pages/Artist.jsx";
import Buypremium from "./pages/Buypremium.jsx";
import Condiciones from "./pages/Condiciones.jsx";
import Favorites from "./pages/Favorites.jsx";
import Home from "./pages/Home.jsx";
import InstallApp from "./pages/InstallApp.jsx";
import Library from "./pages/Library.jsx";
import MainLayout from "./pages/MainLayout.jsx";
import NotFound from "./pages/NotFound.jsx";
import Playlist from "./pages/Playlist.jsx";
import Search from "./pages/Search.jsx";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/artist/:id" element={<Artist />} />
        <Route path="/album/:id" element={<Album />} />
        <Route path="/library" element={<Library />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/playlist/:id" element={<Playlist />} />
        <Route path="/premium" element={<Buypremium />} />
        <Route path="/premium/condiciones" element={<Condiciones />} />
        <Route path="/installapp" element={<InstallApp />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
