import Icon from "../ui/Icon";
import Button from "../ui/Button";

export default function SearchBar({ onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="glass-card flex w-full flex-col items-center gap-2 rounded-xl p-2 md:flex-row md:rounded-full">
      <label className="flex w-full flex-1 items-center gap-3 px-4 py-3">
        <Icon name="search" className="text-outline" />
        <input className="w-full border-none bg-transparent text-sm outline-none placeholder:text-outline focus:ring-0" placeholder="Job title, keywords, or company" />
      </label>
      <div className="hidden h-8 w-px bg-outline-variant md:block" />
      <label className="flex w-full flex-1 items-center gap-3 px-4 py-3">
        <Icon name="location_on" className="text-outline" />
        <input className="w-full border-none bg-transparent text-sm outline-none placeholder:text-outline focus:ring-0" placeholder="City, state, or remote" />
      </label>
      <Button className="w-full rounded-full md:w-auto" type="submit">
        Search <Icon name="arrow_forward" className="text-lg" />
      </Button>
    </form>
  );
}
