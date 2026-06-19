import Button from "../ui/Button";
import Icon from "../ui/Icon";

export default function EmptyState({ icon = "inbox", title, body, action, to }) {
  return (
    <div className="glass-card rounded-xl p-8 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-surface-container text-primary">
        <Icon name={icon} />
      </div>
      <h2 className="font-display text-xl font-bold text-navy">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-secondary">{body}</p>
      {action && <Button to={to} className="mt-6">{action}</Button>}
    </div>
  );
}
