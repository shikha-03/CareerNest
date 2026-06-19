import JobCard from "../../components/cards/JobCard";
import { jobs } from "../../utils/data";
import usePageTitle from "../../hooks/usePageTitle";

export default function SavedJobs() {
  usePageTitle("Saved Jobs");
  return (
    <div>
      <h1 className="mb-6 font-display text-3xl font-bold text-navy">Saved jobs</h1>
      <div className="grid gap-5">{jobs.slice(0, 2).map((job) => <JobCard key={job.id} job={job} />)}</div>
    </div>
  );
}
