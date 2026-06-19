export default function LoadingScreen() {
  return (
    <div className="ambient-bg flex min-h-screen items-center justify-center">
      <div className="glass-card rounded-xl p-8 text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
        <p className="font-semibold text-navy">Loading CareerNest</p>
      </div>
    </div>
  );
}
