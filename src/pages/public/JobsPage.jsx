import JobCard from "../../components/cards/JobCard";
import SearchBar from "../../components/search/SearchBar";
import FilterDropdown from "../../components/search/FilterDropdown";
import { jobs } from "../../utils/data";
import usePageTitle from "../../hooks/usePageTitle";

export default function JobsPage() {
  usePageTitle("Jobs");
  return (
    <main className="mx-auto max-w-7xl px-margin-mobile pb-20 pt-28 md:px-margin-desktop">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-navy">Find your next role</h1>
        <p className="mt-2 text-secondary">Search premium opportunities across product, engineering, recruiting, and operations.</p>
      </div>
      <SearchBar onSubmit={(event) => event.preventDefault()} />
      <div className="my-6 flex flex-wrap gap-4">
        <FilterDropdown label="Work type" options={["Any", "Remote", "Hybrid", "On-site"]} />
        <FilterDropdown label="Experience" options={["Any", "Mid-level", "Senior", "Lead"]} />
        <FilterDropdown label="Salary" options={["Any", "$80k+", "$120k+", "$150k+"]} />
      </div>
      <div className="grid gap-5">
        {jobs.map((job) => <JobCard key={job.id} job={job} />)}
      </div>
    </main>
  );
}
