import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import PlanCard from "../components/PlanCard";
import { PLANS } from "../data/plans";

export default function Buypremium() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="container-fluid p-0">
      <div className="gradientBg text-center text-white py-5 px-3">
        <h2>Exprime al máximo tu música con Sporifi Premium</h2>
        <p className="mb-1">Elige el plan que mejor se adapte a ti. Cancela cuando quieras.</p>
        <p className="small mb-3">
          Sporifi es un proyecto de demostración: los planes son ficticios y no se realiza ningún cobro.
        </p>
        <Link to="/premium/condiciones" className="text-white">
          Consulta las condiciones
        </Link>
      </div>

      <div className="p-4 p-md-5">
        <h3 className="text-center mb-4">Planes para cualquier situación</h3>
        <div className="row g-4 justify-content-center">
          {PLANS.map((plan) => (
            <div key={plan.id} className="col-12 col-md-6 col-xl-4">
              <PlanCard plan={plan} onSelect={setSelected} />
            </div>
          ))}
        </div>
      </div>

      <Modal show={selected !== null} onHide={() => setSelected(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Plan {selected?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sporifi es una demo: no se realiza ningún cobro ni se piden datos de pago. Todas las funciones de la app ya
          están disponibles sin plan.
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={() => setSelected(null)}>
            Entendido
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
