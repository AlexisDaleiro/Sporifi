// Estados de carga y error comunes a las páginas con datos remotos.
// `skeleton` es el placeholder que se muestra mientras carga.
export default function Async({ loading, error, skeleton, children }) {
  if (loading) return skeleton ?? <p className="text-muted">Cargando...</p>;
  if (error) {
    return (
      <p className="text-danger" role="alert">
        No se pudo cargar: {error.message}
      </p>
    );
  }
  return children;
}
