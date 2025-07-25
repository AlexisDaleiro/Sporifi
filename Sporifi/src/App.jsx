import { Route, Routes } from "react-router-dom";
import "./App.css";
import Artist from "./pages/Artist.jsx";
import Home from "./pages/Home.jsx";
import Playlist from "./pages/Playlist.jsx";
import Search from "./pages/Search.jsx";
import NotFound from "./pages/NotFound.jsx";

import Buypremium from "./pages/Buypremium.jsx";

import Condiciones from "./pages/Condiciones.jsx";
import MainLayout from "./pages/MainLayout.jsx";
import EmptyLayout from "./pages/EmptyLayout.jsx";
import { useState } from "react";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/playlist/:id" element={<Playlist />} />
        <Route path="/artist/:id" element={<Artist />} />
        <Route path="/premium" element={<Buypremium />} />
        <Route path="/premium/planes/individual" element={<Buypremium />} />
        <Route path="/premium/planes/duo" element={<Buypremium />} />
        <Route path="/premium/planes/familiar" element={<Buypremium />} />
      </Route>
      <Route element={<EmptyLayout />}>
        <Route path="/premium/condiciones" element={<Condiciones />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
