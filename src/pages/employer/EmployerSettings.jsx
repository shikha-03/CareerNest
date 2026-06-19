import Button from "../../components/ui/Button";
import usePageTitle from "../../hooks/usePageTitle";

export default function EmployerSettings() {
  usePageTitle("Employer Settings");
  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-navy">Company settings</h1>
      <div className="mt-6 space-y-4 glass-card rounded-xl p-6">
        <input className="w-full rounded-lg border border-outline-variant bg-white/70 px-4 py-3" defaultValue="TechNova Labs" />
        <input className="w-full rounded-lg border border-outline-variant bg-white/70 px-4 py-3" defaultValue="careers@technova.com" />
        <textarea className="min-h-32 w-full rounded-lg border border-outline-variant bg-white/70 px-4 py-3" defaultValue="A product-led technology company building hiring tools." />
        <Button>Save settings</Button>
      </div>
    </div>
  );
}
