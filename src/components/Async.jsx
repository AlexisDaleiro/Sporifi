// Estados de carga y error comunes a todas las páginas con datos remotos.
export default function Async({ loading, error, children }) {
  if (loading) return <p className="text-muted">Cargando...</p>;
  if (error) return <p className="text-danger">No se pudo cargar: {error.message}</p>;
  return children;
}
