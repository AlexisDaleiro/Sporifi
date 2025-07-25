import NavBar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import PIndividual from "../components/PIndividual";

export default function Buypremium() {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const handleCloseModal2 = () => setModal2(false);
  const handleCloseModal = () => setModal(false);
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
                  <button
                    onClick={() => setModal2(true)}
                    className="btn btn-outline-light"
                  >
                    Ver todos los planes
                  </button>
                  <div>
                    <Modal show={modal2} onHide={handleCloseModal2} size="xl">
                      <Modal.Header closeButton>
                        <Modal.Title>Todos los planes</Modal.Title>
                      </Modal.Header>
                      <Modal.Body className="row ">
                        <div className="col-md-4">
                          <PIndividual />
                        </div>

                        <div className="col-md-4">
                          <PIndividual
                            planType="Duo"
                            price="14.99"
                            period="mes"
                            features={[
                              "Escucha tu musica favorita sin anuncios",
                              "Descarga de canciones para disfrutarlas sin conexion",
                              "Escucha canciones en cualquier orden",
                              "Calidad del audio alta",
                              "Escucha lo que quieras con tus amigos, en tiempo real",
                            ]}
                            isPopular={true}
                          />
                        </div>
                        <div className="col-md-4">
                          <PIndividual
                            planType="Familiar"
                            price="19.99"
                            period="mes"
                            features={[
                              "Escucha tu musica favorita sin anuncios",
                              "Descarga de canciones para disfrutarlas sin conexion",
                              "Escucha canciones en cualquier orden",
                              "Calidad del audio alta",
                              "Escucha lo que quieras con tus familiares, en tiempo real",
                            ]}
                          />
                        </div>
                      </Modal.Body>
                      <Modal.Footer></Modal.Footer>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <Link to={"/premium/condiciones"}>
                  <button className="btn text-white text-decoration-none">
                    Consulte las condiciones
                  </button>{" "}
                </Link>

                <div>
                  <Modal show={modal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Woohoo, you're reading this text in a modal!
                    </Modal.Body>
                  </Modal>
                </div>
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
                        Pasar a premium duo
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
                        Pasar a premium familiar
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
