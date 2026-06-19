import Button from "../../components/ui/Button";
import usePageTitle from "../../hooks/usePageTitle";

export default function PostJob() {
  usePageTitle("Post Job");
  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-3xl font-bold text-navy">Post a job</h1>
      <form className="mt-6 grid gap-4 glass-card rounded-xl p-6">
        <input className="rounded-lg border border-outline-variant bg-white/75 px-4 py-3" placeholder="Job title" />
        <input className="rounded-lg border border-outline-variant bg-white/75 px-4 py-3" placeholder="Location" />
        <input className="rounded-lg border border-outline-variant bg-white/75 px-4 py-3" placeholder="Salary range" />
        <textarea className="min-h-40 rounded-lg border border-outline-variant bg-white/75 px-4 py-3" placeholder="Job description" />
        <Button>Publish job</Button>
      </form>
    </div>
  );
}
