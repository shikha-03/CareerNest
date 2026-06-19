import Button from "../../components/ui/Button";
import usePageTitle from "../../hooks/usePageTitle";

export default function CandidateProfile() {
  usePageTitle("Candidate Profile");
  return (
    <article className="glass-card max-w-4xl rounded-xl p-6">
      <h1 className="font-display text-3xl font-bold text-navy">Priya Shah</h1>
      <p className="mt-2 text-secondary">Frontend Engineer • 94% match • Bengaluru</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {["React", "Tailwind CSS", "Design Systems"].map((skill) => <span key={skill} className="rounded-lg bg-surface-container px-4 py-3 text-sm font-semibold text-primary">{skill}</span>)}
      </div>
      <p className="mt-6 leading-7 text-secondary">Product-minded frontend engineer with strong UI craft, accessibility experience, and dashboard delivery background.</p>
      <Button className="mt-6">Move to interview</Button>
    </article>
  );
}
