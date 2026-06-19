import Icon from "../ui/Icon";

export default function AnalyticsCard({ label, value, trend, icon = "analytics" }) {
  return (
    <div className="glass-card group relative overflow-hidden rounded-xl p-6 transition hover:-translate-y-1">
      <div className="absolute right-0 top-0 h-32 w-32 -translate-y-10 translate-x-10 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-cyan/20" />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-secondary">{label}</p>
          <h3 className="mt-2 font-display text-3xl font-bold text-navy">{value}</h3>
        </div>
        <div className="rounded-lg bg-surface-container p-3 text-primary">
          <Icon name={icon} />
        </div>
      </div>
      <p className="relative mt-5 flex items-center gap-2 text-xs font-semibold text-tertiary-container">
        <Icon name="trending_up" className="text-base" /> {trend}
      </p>
    </div>
  );
}
