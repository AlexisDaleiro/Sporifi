import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center p-5">
      <p className="fs-4 fw-semibold text-primary">404</p>
      <h1 className="mt-3 display-4 fw-semibold">Página no encontrada</h1>
      <p className="mt-3 fs-5 text-muted">No encontramos la página que buscas.</p>
      <Link to="/" className="btn btn-primary px-4 py-2 fw-semibold mt-3">
        Volver al inicio
      </Link>
    </div>
  );
}
