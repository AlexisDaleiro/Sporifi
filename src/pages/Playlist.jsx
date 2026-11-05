import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useLibraryStore from "../store/library";
import CollectionHeader from "../components/CollectionHeader";
import TrackList from "../components/TrackList";

export default function Playlist() {
  const { id } = useParams();
  const navigate = useNavigate();
  const playlist = useLibraryStore((s) => s.playlists.find((p) => p.id === id));
  const renamePlaylist = useLibraryStore((s) => s.renamePlaylist);
  const deletePlaylist = useLibraryStore((s) => s.deletePlaylist);
  const removeFromPlaylist = useLibraryStore((s) => s.removeFromPlaylist);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");

  if (!playlist) {
    return (
      <div className="container-fluid p-4 p-md-5">
        <p>Esta playlist no existe.</p>
        <Link to="/library">Volver a tu biblioteca</Link>
      </div>
    );
  }

  const startEditing = () => {
    setName(playlist.name);
    setEditing(true);
  };
  const saveName = (e) => {
    e.preventDefault();
    renamePlaylist(id, name);
    setEditing(false);
  };
  const remove = () => {
    if (window.confirm(`¿Eliminar la playlist "${playlist.name}"?`)) {
      deletePlaylist(id);
      navigate("/library");
    }
  };

  return (
    <div className="container-fluid p-4 p-md-5">
      <CollectionHeader title={playlist.name} subtitle="Playlist" tracks={playlist.tracks}>
        {editing ? (
          <form onSubmit={saveName} className="d-flex gap-2">
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="Nombre de la playlist"
              autoFocus
            />
            <button className="btn btn-success">Guardar</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setEditing(false)}>
              Cancelar
            </button>
          </form>
        ) : (
          <>
            <button className="btn btn-outline-secondary" onClick={startEditing}>
              Renombrar
            </button>
            <button className="btn btn-outline-danger" onClick={remove}>
              Eliminar
            </button>
          </>
        )}
      </CollectionHeader>
      {playlist.tracks.length === 0 ? (
        <p className="text-muted">Esta playlist está vacía. Agrega canciones con el botón ＋ de cualquier lista.</p>
      ) : (
        <TrackList tracks={playlist.tracks} onRemove={(track) => removeFromPlaylist(id, track.id)} />
      )}
    </div>
  );
}
