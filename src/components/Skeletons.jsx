// Placeholders de carga con la misma forma que el contenido final.
const Block = ({ className = "", style }) => <div className={`skeleton ${className}`} style={style} />;

function Busy({ children }) {
  return (
    <div role="status" aria-busy="true">
      <span className="visually-hidden">Cargando...</span>
      <div aria-hidden="true">{children}</div>
    </div>
  );
}

export function CardsSkeleton({ count = 8 }) {
  return (
    <Busy>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className="col">
            <Block style={{ height: 330 }} />
          </div>
        ))}
      </div>
    </Busy>
  );
}

export function TilesSkeleton({ count = 6, round = false }) {
  return (
    <Busy>
      <div className="row row-cols-2 row-cols-md-4 row-cols-xl-6 g-3">
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className="col">
            <Block className={round ? "rounded-circle" : ""} style={{ aspectRatio: "1" }} />
            <Block className="mt-2" style={{ height: 16, width: "70%" }} />
          </div>
        ))}
      </div>
    </Busy>
  );
}

export function ListSkeleton({ rows = 6 }) {
  return (
    <Busy>
      <div className="d-flex flex-column gap-2">
        {Array.from({ length: rows }, (_, i) => (
          <Block key={i} style={{ height: 64 }} />
        ))}
      </div>
    </Busy>
  );
}

// Cabecera (portada + título) y lista: para páginas de artista, álbum o carga de una ruta.
export function PageSkeleton() {
  return (
    <div className="container-fluid p-4 p-md-5">
      <Busy>
        <div className="d-flex flex-wrap gap-4 mb-4">
          <Block style={{ width: 200, height: 200 }} />
          <div className="flex-grow-1 align-self-end">
            <Block style={{ height: 36, width: "50%" }} />
            <Block className="mt-3" style={{ height: 40, width: 160 }} />
          </div>
        </div>
        <div className="d-flex flex-column gap-2">
          {Array.from({ length: 6 }, (_, i) => (
            <Block key={i} style={{ height: 64 }} />
          ))}
        </div>
      </Busy>
    </div>
  );
}
