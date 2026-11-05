import { Link } from "react-router-dom";

export default function Condiciones() {
  return (
    <div className="container py-5" style={{ maxWidth: 760 }}>
      <Link to="/premium">&larr; Volver a Premium</Link>
      <h1 className="mt-3 mb-4">Condiciones de uso</h1>

      <h2 className="h5">Qué es Sporifi</h2>
      <p>Sporifi es un proyecto personal de demostración, sin fines comerciales.</p>

      <h2 className="h5">Música</h2>
      <p>
        Las canciones y portadas provienen de <a href="https://www.jamendo.com">Jamendo</a>. Cada canción se publica
        bajo la licencia Creative Commons que eligió su artista. Sporifi no aloja ningún archivo de audio.
      </p>

      <h2 className="h5">Planes Premium</h2>
      <p>Los planes y precios de la página Premium son ficticios. No hay pagos ni se solicitan datos de pago.</p>

      <h2 className="h5">Tus datos</h2>
      <p>
        No hay cuentas de usuario. Tus favoritos, playlists, historial reciente, volumen y cola de reproducción se
        guardan solo en tu navegador y puedes borrarlos limpiando los datos del sitio. Sporifi no recopila datos
        personales. Tu navegador se conecta directamente a Jamendo para obtener el catálogo y el audio, y se aplica la
        política de privacidad de Jamendo.
      </p>

      <h2 className="h5">Contacto</h2>
      <p>
        El código está en <a href="https://github.com/AlexisDaleiro/Sporifi">github.com/AlexisDaleiro/Sporifi</a>.
      </p>
    </div>
  );
}
