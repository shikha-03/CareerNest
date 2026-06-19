import CompanyCard from "../../components/cards/CompanyCard";
import { companies } from "../../utils/data";
import usePageTitle from "../../hooks/usePageTitle";

export default function CompaniesPage() {
  usePageTitle("Companies");
  return (
    <main className="mx-auto max-w-7xl px-margin-mobile pb-20 pt-28 md:px-margin-desktop">
      <h1 className="font-display text-4xl font-bold text-navy">Explore companies</h1>
      <p className="mt-2 text-secondary">Discover teams actively hiring through CareerNest.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {companies.map((company) => <CompanyCard key={company.name} company={company} />)}
      </div>
    </main>
  );
}
