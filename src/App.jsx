import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./pages/MainLayout.jsx";

// Cada página se carga cuando se visita (el layout y el player quedan siempre montados).
const Album = lazy(() => import("./pages/Album.jsx"));
const Artist = lazy(() => import("./pages/Artist.jsx"));
const Buypremium = lazy(() => import("./pages/Buypremium.jsx"));
const Condiciones = lazy(() => import("./pages/Condiciones.jsx"));
const Favorites = lazy(() => import("./pages/Favorites.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const InstallApp = lazy(() => import("./pages/InstallApp.jsx"));
const Library = lazy(() => import("./pages/Library.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const Playlist = lazy(() => import("./pages/Playlist.jsx"));
const Search = lazy(() => import("./pages/Search.jsx"));

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
