import AnalyticsCard from "../../components/cards/AnalyticsCard";
import JobCard from "../../components/cards/JobCard";
import NotificationCard from "../../components/cards/NotificationCard";
import { jobs, notifications } from "../../utils/data";
import usePageTitle from "../../hooks/usePageTitle";

export default function CandidateDashboard() {
  usePageTitle("Candidate Dashboard");
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-navy">Welcome back, Alex</h1>
        <p className="mt-2 text-secondary">Here is your job search momentum for today.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        <AnalyticsCard label="Profile views" value="248" trend="+18% this week" icon="visibility" />
        <AnalyticsCard label="Applications" value="12" trend="4 active interviews" icon="description" />
        <AnalyticsCard label="Saved jobs" value="27" trend="6 strong matches" icon="bookmark" />
      </div>
      <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div>
          <h2 className="mb-4 font-display text-xl font-bold text-navy">Recommended jobs</h2>
          <div className="space-y-4">{jobs.slice(0, 2).map((job) => <JobCard key={job.id} job={job} compact />)}</div>
        </div>
        <div>
          <h2 className="mb-4 font-display text-xl font-bold text-navy">Notifications</h2>
          <div className="space-y-4">{notifications.slice(0, 2).map((item) => <NotificationCard key={item.id} item={item} />)}</div>
        </div>
      </section>
    </div>
  );
}
