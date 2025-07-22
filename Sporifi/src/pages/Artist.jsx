import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Artist() {
  const { id } = useParams();
  const [artista, setArtista] = useState(null);
  const [releases, setReleases] = useState([]);

  const BASE_URL = "https://musicbrainz.org/ws/2/artist?query=artist:";

  useEffect(() => {
    axios
      .get(`https://musicbrainz.org/ws/2/artist?query=artist:${id}&fmt=json`)
      .then((response) => {
        setArtista(response.data.artists[0]);
        // 2. Buscar releases del artista
        return axios.get(
          `https://musicbrainz.org/ws/2/release?artist=${response.data.artists[0].id}&fmt=json`
        );
      })
      .then((response) => {
        setReleases(response.data.releases);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const firstRelease = releases[0];

  return (
    <div className="container-fluid">
      {!artista ? (
        <p>Cargando artista...</p>
      ) : (
        <div className="row">
          {firstRelease ? (
            <div className="col-md-4">
              <img
                src={`https://coverartarchive.org/release/${firstRelease.id}/front`}
                alt={firstRelease.title}
                style={{ width: 400, height: 400, objectFit: "cover" }}
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          ) : (
            <p></p>
          )}

          <div className="col-md-5">
            <h2>{artista.name}</h2>

            <p> Fecha de creacion de banda: {artista["life-span"].begin} </p>

            <p>
              {" "}
              {artista.area.name}, {artista["begin-area"].name}{" "}
            </p>

            <p> Generos: {artista.tags.map((tag) => tag.name)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
