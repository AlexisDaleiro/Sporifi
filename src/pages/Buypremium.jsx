import NavBar from "../components/Navbar";

export default function Buypremium() {
  return (
    <>
      <div className="container-fluid">
        <div className=" row gradientBg d-flex justify-content-center py-5">
          <div className="col-md-12 text-center text-white ">
            <h2>Exprime al maximo tu musica, con premium individual</h2>
            <p>
              Disfruta de la mejor musica, sin anuncios, sin publicidad, con
              Sporify premium. Desde solo 7,99 US$. Cancela cuando quieras
            </p>
            <div className="d-flex justify-content-center">
              <div className="row my-4 ">
                <div className="col-md-6 ">
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
        <div className="row d-flex justify-content-center">
          <div className="bg-dark text-white py-5 text-center">
            <div className="col-md-12 ">
              <h3>Planes asequibles para cualquier situación</h3>
              <p>
                Elige un plan premium y escucha musica sin anuncios y sin
                limites en telefonos, altavoces y otros dispositivos. Paga de
                varias formas. Cancela cuando quieras
              </p>
            </div>
            <div className="row ">
              <div className="col-md-12">
                <img src="/src/assets/tarjetas.png" alt="" width={"300px"} />
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-md-12">
                <h2>Todos los planes Premium incluyen lo siguiente:</h2>
                <ul className="check-list">
                  <li>Escucha tu musica favorita sin anuncios</li>
                  <li>Descarga de canciones para disfrutarlas sin conexion</li>
                  <li>Escucha canciones en cualquier orden</li>
                  <li>Calidad del audio alta</li>
                  <li>Escucha lo que quieras con tus amigos, en tiempo real</li>
                  <li>Organiza la cola de reproduccion</li>
                </ul>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-md-10">
                  <div className="card bg-black text-white border border-white shadow">
                    <div className="card-header">
                      <h5 className="card-title">Individual</h5>
                    </div>
                    <div className="card-body">
                      <p className="card-text">
                        1 cuenta. 7,99 US$ al mes o 79,99 US$ al año. Cancela
                        cuando quieras. El plan individual es perfecto para
                        quienes quieren escuchar musica sin anuncios, sin
                        publicidad, con Sporify Premium{" "}
                      </p>
                      <button className="btn btn-light">
                        Pasar a premium individual
                      </button>
                    </div>
                  </div>
                  <div className="card bg-black text-white border border-white shadow mt-3">
                    <div className="card-header">
                      <h5 className="card-title">Duo</h5>
                    </div>
                    <div className="card-body">
                      <p className="card-text">
                        1 cuenta. 7,99 US$ al mes o 79,99 US$ al año. Cancela
                        cuando quieras. El plan individual es perfecto para
                        quienes quieren escuchar musica sin anuncios, sin
                        publicidad, con Sporify Premium{" "}
                      </p>
                      <button className="btn btn-light">
                        Pasar a premium individual
                      </button>
                    </div>
                  </div>
                  <div className="card bg-black text-white border border-white shadow mt-3">
                    <div className="card-header">
                      <h5 className="card-title">Familiar</h5>
                    </div>
                    <div className="card-body">
                      <p className="card-text">
                        1 cuenta. 7,99 US$ al mes o 79,99 US$ al año. Cancela
                        cuando quieras. El plan individual es perfecto para
                        quienes quieren escuchar musica sin anuncios, sin
                        publicidad, con Sporify Premium{" "}
                      </p>
                      <button className="btn btn-light">
                        Pasar a premium individual
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
