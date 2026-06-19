import { motion } from "framer-motion";
import SearchBar from "../../components/search/SearchBar";
import Button from "../../components/ui/Button";
import Icon from "../../components/ui/Icon";
import CompanyCard from "../../components/cards/CompanyCard";
import JobCard from "../../components/cards/JobCard";
import { companies, jobs } from "../../utils/data";
import usePageTitle from "../../hooks/usePageTitle";

export default function HomePage() {
  usePageTitle("Home");
  return (
    <main className="pt-28">
      <section className="mx-auto max-w-7xl px-margin-mobile py-16 text-center md:px-margin-desktop md:py-24">
        <motion.div initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full glass-card px-4 py-2 text-xs font-bold text-primary">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" /> Over 10,000 new remote jobs added this week
        </motion.div>
        <motion.h1 initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.08 }} className="mx-auto max-w-4xl font-display text-4xl font-extrabold leading-tight text-navy md:text-6xl">
          Discover your next career move with <span className="text-gradient">precision</span>.
        </motion.h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-secondary">Connecting Talent with Opportunity through modern matching, trusted companies, and a premium hiring experience.</p>
        <div className="mx-auto mt-10 max-w-4xl">
          <SearchBar onSubmit={(event) => event.preventDefault()} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-margin-mobile pb-16 md:px-margin-desktop">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy">Featured jobs</h2>
            <p className="text-sm text-secondary">Curated roles from high-growth teams.</p>
          </div>
          <Button to="/jobs" variant="secondary">Browse all <Icon name="arrow_forward" /></Button>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {jobs.map((job) => <JobCard key={job.id} job={job} compact />)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-margin-mobile pb-20 md:px-margin-desktop">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-bold text-navy">Trusted by modern teams</h2>
          <p className="text-sm text-secondary">Startup-level hiring experiences with enterprise discipline.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {companies.map((company) => <CompanyCard key={company.name} company={company} />)}
        </div>
      </section>
    </main>
  );
}
