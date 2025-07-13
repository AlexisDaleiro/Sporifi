import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Artist from "./pages/Artist.jsx";
import Home from "./pages/Home.jsx";
import Playlist from "./pages/Playlist.jsx";
import Search from "./pages/Search.jsx";
import NotFound from "./pages/NotFound.jsx";
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "*", element: <NotFound /> },
  { path: "playlist", element: <Playlist /> },
  { path: "search", element: <Search /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
