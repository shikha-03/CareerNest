import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Icon from "../ui/Icon";

export default function JobCard({ job, compact = false }) {
  return (
    <article className="glass-card rounded-xl p-5 transition hover:-translate-y-1">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link to={`/jobs/${job.id}`} className="font-display text-lg font-bold text-navy hover:text-primary">{job.title}</Link>
          <p className="mt-1 text-sm font-medium text-secondary">{job.company}</p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm text-on-surface-variant">
            <span className="flex items-center gap-1"><Icon name="location_on" className="text-base" />{job.location}</span>
            <span className="flex items-center gap-1"><Icon name="schedule" className="text-base" />{job.type}</span>
            <span className="flex items-center gap-1"><Icon name="payments" className="text-base" />{job.salary}</span>
          </div>
        </div>
        <Button to={`/jobs/${job.id}`} className="shrink-0">View Details</Button>
      </div>
      {!compact && <p className="mt-4 text-sm leading-6 text-secondary">{job.description}</p>}
      <div className="mt-4 flex flex-wrap gap-2">
        {job.tags.map((tag) => <span key={tag} className="rounded-full bg-surface-container px-3 py-1 text-xs font-semibold text-primary">{tag}</span>)}
      </div>
    </article>
  );
}
