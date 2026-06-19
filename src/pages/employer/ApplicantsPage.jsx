import Button from "../../components/ui/Button";
import { applicants } from "../../utils/data";
import usePageTitle from "../../hooks/usePageTitle";

export default function ApplicantsPage() {
  usePageTitle("Applicants");
  return (
    <div>
      <h1 className="mb-6 font-display text-3xl font-bold text-navy">Applicants</h1>
      <div className="grid gap-4">{applicants.map((person) => (
        <article key={person.name} className="glass-card flex flex-col justify-between gap-4 rounded-xl p-5 md:flex-row md:items-center">
          <div><h2 className="font-semibold text-navy">{person.name}</h2><p className="text-sm text-secondary">{person.role} • {person.stage} • {person.match} match</p></div>
          <Button to="/employer/candidate-profile" variant="secondary">View profile</Button>
        </article>
      ))}</div>
    </div>
  );
}
