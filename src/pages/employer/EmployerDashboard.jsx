import AnalyticsCard from "../../components/cards/AnalyticsCard";
import Button from "../../components/ui/Button";
import Icon from "../../components/ui/Icon";
import { applicants, jobs } from "../../utils/data";
import usePageTitle from "../../hooks/usePageTitle";

export default function EmployerDashboard() {
  usePageTitle("Employer Dashboard");
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="font-display text-3xl font-bold text-navy">Welcome back, Alex</h1>
          <p className="mt-2 text-secondary">Here is what is happening with TechNova's recruitment today.</p>
        </div>
        <Button to="/employer/post-job"><Icon name="add" /> Post New Job</Button>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        <AnalyticsCard label="Total applicants" value="1,284" trend="+12.5% vs last month" icon="groups" />
        <AnalyticsCard label="Open jobs" value="18" trend="5 roles closing soon" icon="work" />
        <AnalyticsCard label="Interview rate" value="32%" trend="+8% this quarter" icon="monitoring" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="glass-card rounded-xl p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-navy">Recent applicants</h2>
          <div className="space-y-3">{applicants.map((person) => <div key={person.name} className="rounded-lg bg-white/60 p-4"><p className="font-semibold text-navy">{person.name}</p><p className="text-sm text-secondary">{person.role} • {person.stage} • {person.match} match</p></div>)}</div>
        </section>
        <section className="glass-card rounded-xl p-6">
          <h2 className="mb-4 font-display text-xl font-bold text-navy">Active jobs</h2>
          <div className="space-y-3">{jobs.map((job) => <div key={job.id} className="rounded-lg bg-white/60 p-4"><p className="font-semibold text-navy">{job.title}</p><p className="text-sm text-secondary">{job.company} • {job.posted}</p></div>)}</div>
        </section>
      </div>
    </div>
  );
}
