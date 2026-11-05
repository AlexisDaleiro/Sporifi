import Dropdown from "react-bootstrap/Dropdown";
import useLibraryStore from "../store/library";

export default function AddToPlaylist({ track }) {
  const playlists = useLibraryStore((s) => s.playlists);
  const addToPlaylist = useLibraryStore((s) => s.addToPlaylist);
  const createPlaylist = useLibraryStore((s) => s.createPlaylist);

  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        variant="link"
        className="p-0 fs-5 text-secondary text-decoration-none"
        aria-label={`Agregar ${track.title} a una playlist`}
      >
        ＋
      </Dropdown.Toggle>
      <Dropdown.Menu popperConfig={{ strategy: "fixed" }}>
        {playlists.map((p) => {
          const included = p.tracks.some((t) => t.id === track.id);
          return (
            <Dropdown.Item key={p.id} disabled={included} onClick={() => addToPlaylist(p.id, track)}>
              {included ? "✓ " : ""}
              {p.name}
            </Dropdown.Item>
          );
        })}
        {playlists.length > 0 && <Dropdown.Divider />}
        <Dropdown.Item onClick={() => createPlaylist(undefined, [track])}>Nueva playlist con esta canción</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
