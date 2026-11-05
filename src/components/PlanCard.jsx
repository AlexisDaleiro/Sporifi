import { PLAN_FEATURES } from "../data/plans";

const ACCENT = "#0000FF";

export default function PlanCard({ plan, onSelect }) {
  return (
    <div className="plan-card" style={{ borderColor: plan.popular ? ACCENT : "#ddd" }}>
      {plan.popular && (
        <div className="plan-popular-badge" style={{ backgroundColor: ACCENT }}>
          Plan más popular
        </div>
      )}

      <div className="plan-header">
        <h3 className="plan-title">{plan.name}</h3>
        <p className="plan-subtitle">{plan.accounts}</p>
        <p className="plan-payment">Pago mensual</p>
      </div>

      <div className="plan-price">
        <h2>{plan.price} US$</h2>
        <p>por mes</p>
      </div>

      <hr className="plan-divider" />

      <ul className="plan-features">
        {PLAN_FEATURES.map((feature) => (
          <li key={feature}>
            <span className="plan-check-icon">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <button
        className="plan-button"
        onClick={() => onSelect(plan)}
        style={{
          backgroundColor: plan.popular ? ACCENT : "transparent",
          color: plan.popular ? "white" : "black",
          borderColor: ACCENT,
        }}
      >
        Elegir {plan.name}
      </button>
    </div>
  );
}
