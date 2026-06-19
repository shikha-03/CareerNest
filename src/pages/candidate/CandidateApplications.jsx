import EmptyState from "../../components/feedback/EmptyState";
import usePageTitle from "../../hooks/usePageTitle";

export default function CandidateApplications() {
  usePageTitle("Applications");
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold text-navy">Applications</h1>
      <div className="grid gap-4">
        {["TechNova Labs", "BrightPath AI"].map((company, index) => (
          <div key={company} className="glass-card rounded-xl p-5">
            <p className="font-semibold text-navy">{index === 0 ? "Senior Product Designer" : "Frontend Engineer"}</p>
            <p className="mt-1 text-sm text-secondary">{company} • {index === 0 ? "Interview" : "Submitted"}</p>
          </div>
        ))}
      </div>
      <EmptyState title="No archived applications" body="Completed or withdrawn applications will appear here." />
    </div>
  );
}
