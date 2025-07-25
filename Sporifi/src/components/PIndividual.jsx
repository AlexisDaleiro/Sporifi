import React from "react";

export default function PIndividual({
  planType = "Individual",
  price = "$9.99",
  period = "mes",
  features = [
    "Escucha música sin anuncios y sin publicidad",
    "Reproduce en cualquier lugar, incluso sin conexión, sin descargas",
    "Reproducción on-demand",
    "Cancela cuando quieras",
    "Acceso a la biblioteca de canciones",
  ],
  isPopular = false,
  buttonText = "Empezar",
  accentColor = "#0000FF",
}) {
  return (
    <div
      className="spotify-plan-card"
      style={{
        borderColor: isPopular ? accentColor : "#ddd",
      }}
    >
      {isPopular && (
        <div
          className="plan-popular-badge"
          style={{ backgroundColor: accentColor }}
        >
          Plan más popular
        </div>
      )}

      <div className="plan-header">
        <h3 className="plan-title">{planType}</h3>
        <p className="plan-subtitle">Cuenta individual</p>
        <p className="plan-payment">Pago mensual</p>
      </div>

      <div className="plan-price">
        <h2>{price}</h2>
        <p>por {period}</p>
      </div>

      <hr className="plan-divider" />

      <ul className="plan-features">
        {features.map((feature, index) => (
          <li key={index}>
            <span className="plan-check-icon">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <button
        className="plan-button"
        style={{
          backgroundColor: isPopular ? accentColor : "transparent",
          color: isPopular ? "white" : "black",
          borderColor: accentColor,
        }}
      >
        {buttonText}
      </button>

      <p className="plan-terms">
        <small>
          Se aplican Términos y Condiciones. El mes gratis no está disponible
          para usuarios que ya hayan probado Premium.
        </small>
      </p>
    </div>
  );
}
