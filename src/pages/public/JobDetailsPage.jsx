import { useParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import Icon from "../../components/ui/Icon";
import { jobs } from "../../utils/data";
import usePageTitle from "../../hooks/usePageTitle";

export default function JobDetailsPage() {
  const { jobId } = useParams();
  const job = jobs.find((item) => item.id === jobId) || jobs[0];
  usePageTitle(job.title);

  return (
    <main className="mx-auto max-w-5xl px-margin-mobile pb-20 pt-28 md:px-margin-desktop">
      <article className="glass-card rounded-xl p-6 md:p-10">
        <p className="mb-3 text-sm font-bold uppercase tracking-wide text-primary">{job.company}</p>
        <h1 className="font-display text-4xl font-bold text-navy">{job.title}</h1>
        <div className="mt-5 flex flex-wrap gap-3 text-sm text-secondary">
          <span className="flex items-center gap-1"><Icon name="location_on" />{job.location}</span>
          <span className="flex items-center gap-1"><Icon name="schedule" />{job.type}</span>
          <span className="flex items-center gap-1"><Icon name="payments" />{job.salary}</span>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to="/candidate/applications"><Icon name="send" /> Apply now</Button>
          <Button to="/candidate/saved-jobs" variant="secondary"><Icon name="bookmark" /> Save job</Button>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_280px]">
          <div className="space-y-6 text-secondary">
            <section>
              <h2 className="mb-3 font-display text-xl font-bold text-navy">About the role</h2>
              <p className="leading-7">{job.description} You will collaborate closely with product, engineering, and hiring leaders to improve every touchpoint in the talent journey.</p>
            </section>
            <section>
              <h2 className="mb-3 font-display text-xl font-bold text-navy">What you will do</h2>
              <ul className="list-inside list-disc space-y-2 leading-7">
                <li>Own high-impact initiatives from discovery through launch.</li>
                <li>Partner with cross-functional teams and communicate decisions clearly.</li>
                <li>Use data and customer insight to improve outcomes.</li>
              </ul>
            </section>
          </div>
          <aside className="rounded-xl bg-white/60 p-5">
            <h3 className="font-display font-bold text-navy">Job snapshot</h3>
            <div className="mt-4 space-y-3 text-sm text-secondary">
              <p>Posted: {job.posted}</p>
              <p>Applicants: 48</p>
              <p>Match score: 92%</p>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
