import Icon from "./Icon";

export default function EmptyState({ icon = "music", title, children }) {
  return (
    <div className="text-center py-5">
      <Icon name={icon} size={48} className="text-secondary" />
      <p className="h5 mt-3">{title}</p>
      {children && <div className="text-muted">{children}</div>}
    </div>
  );
}
