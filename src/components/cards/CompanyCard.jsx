import Icon from "../ui/Icon";

export default function CompanyCard({ company }) {
  return (
    <article className="glass-card rounded-xl p-5">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-cyan text-white">
        <Icon name="business" />
      </div>
      <h3 className="font-display text-lg font-bold text-navy">{company.name}</h3>
      <p className="mt-1 text-sm text-secondary">{company.industry} • {company.location}</p>
      <p className="mt-4 text-sm font-semibold text-primary">{company.jobs} open roles</p>
    </article>
  );
}
