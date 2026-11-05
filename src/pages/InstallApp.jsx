export default function InstallApp() {
  return (
    <div className="container-fluid p-4 p-md-5" style={{ maxWidth: 760 }}>
      <h2 className="mb-3">Instalar Sporifi</h2>
      <p>
        Sporifi es una aplicación web: funciona directamente en el navegador, en el ordenador y en el móvil. Si
        quieres abrirla como una app, crea un acceso directo:
      </p>
      <ul>
        <li>
          <strong>Chrome o Edge (ordenador):</strong> menú del navegador, "Guardar y compartir" o "Aplicaciones", y
          "Crear acceso directo" o "Instalar".
        </li>
        <li>
          <strong>Chrome (Android):</strong> menú de tres puntos y "Añadir a la pantalla de inicio".
        </li>
        <li>
          <strong>Safari (iPhone o iPad):</strong> botón Compartir y "Añadir a pantalla de inicio".
        </li>
      </ul>
      <p className="text-muted">
        Los nombres exactos de los menús cambian según la versión del navegador. Aún no hay una app nativa.
      </p>
    </div>
  );
}
