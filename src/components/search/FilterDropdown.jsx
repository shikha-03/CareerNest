export default function FilterDropdown({ label, options = [] }) {
  return (
    <label className="flex min-w-44 flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-secondary">
      {label}
      <select className="rounded-lg border border-white/60 bg-white/70 px-4 py-3 text-sm font-medium normal-case text-navy outline-none focus:border-primary">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}
