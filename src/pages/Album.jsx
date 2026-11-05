import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getAlbum } from "../services/jamendo";
import Async from "../components/Async";
import CollectionHeader from "../components/CollectionHeader";
import TrackList from "../components/TrackList";

export default function Album() {
  const { id } = useParams();
  const { data: album, loading, error } = useFetch(() => getAlbum(id), [id]);

  return (
    <div className="container-fluid p-4 p-md-5">
      <Async loading={loading} error={error}>
        {!album ? (
          <p>Álbum no encontrado.</p>
        ) : (
          <>
            <CollectionHeader
              title={album.name}
              cover={album.cover}
              tracks={album.tracks}
              subtitle={
                <>
                  <Link to={`/artist/${album.artistId}`}>{album.artistName}</Link>
                  {album.releaseDate && ` · ${album.releaseDate.slice(0, 4)}`}
                </>
              }
            />
            <TrackList tracks={album.tracks} />
          </>
        )}
      </Async>
    </div>
  );
}
