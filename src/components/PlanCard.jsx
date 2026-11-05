import { PLAN_FEATURES } from "../data/plans";

export default function PlanCard({ plan, onSelect }) {
  return (
    <div className={`plan-card${plan.popular ? " plan-card--popular" : ""}`}>
      {plan.popular && (
        <div className="plan-popular-badge">
          Plan más popular
        </div>
      )}

      <div className="plan-header">
        <h3 className="plan-title">{plan.name}</h3>
        <p className="plan-subtitle">{plan.accounts}</p>
        <p className="plan-payment">Pago mensual</p>
      </div>

      <div className="plan-price">
        <div className="plan-amount">{plan.price} US$</div>
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
        className={`plan-button${plan.popular ? " plan-button--primary" : ""}`}
        onClick={() => onSelect(plan)}
      >
        Elegir {plan.name}
      </button>
    </div>
  );
}
