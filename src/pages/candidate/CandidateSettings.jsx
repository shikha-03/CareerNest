import Button from "../../components/ui/Button";
import usePageTitle from "../../hooks/usePageTitle";

export default function CandidateSettings() {
  usePageTitle("Candidate Settings");
  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-navy">Settings</h1>
      <div className="mt-6 space-y-4 glass-card rounded-xl p-6">
        <input className="w-full rounded-lg border border-outline-variant bg-white/70 px-4 py-3" defaultValue="Alex Rivera" />
        <input className="w-full rounded-lg border border-outline-variant bg-white/70 px-4 py-3" defaultValue="alex@careernest.com" />
        <textarea className="min-h-32 w-full rounded-lg border border-outline-variant bg-white/70 px-4 py-3" defaultValue="Senior Product Designer focused on SaaS products." />
        <Button>Save changes</Button>
      </div>
    </div>
  );
}
