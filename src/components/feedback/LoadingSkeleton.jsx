export default function LoadingSkeleton({ lines = 3 }) {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="mb-4 h-5 w-1/2 animate-pulse rounded bg-surface-container-high" />
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="mb-3 h-3 animate-pulse rounded bg-surface-container" />
      ))}
    </div>
  );
}
