import Footer from "../components/Footer";
import NavBar from "../components/Navbar";

export default function Buypremium() {
  return (
    <>
      <div className="gradientBg d-flex justify-content-center py-5">
        <div className="row">
          <div className="col-md-12 text-center text-white ">
            <h2>Exprime al maximo tu musica, con premium individual</h2>
            <p>
              Disfruta de la mejor musica, sin anuncios, sin publicidad, con
              Sporify premium. Desde solo 7,99 US$. Cancela cuando quieras
            </p>
            <div className="row my-4">
              <div className="col-md-6">
                <button className="btn btn-light">
                  Pasar a premium individual
                </button>
              </div>
              <div className="col-md-6 ">
                <button className="btn btn-outline-light">
                  Ver todos los planes
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <a className="text-white text-decoration-none" href="#">
                  Consulte las condiciones
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="bg-dark text-white py-5 text-center">
          <div className="col-md-12 ">
            <h3>Planes asequibles para cualquier situación</h3>
            <p>
              Elige un plan premium y escucha musica sin anuncios y sin limites
              en telefonos, altavoces y otros dispositivos. Paga de varias
              formas. Cancela cuando quieras
            </p>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
