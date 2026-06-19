import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import usePageTitle from "../hooks/usePageTitle";

export default function NotFoundPage() {
  usePageTitle("Not Found");
  return (
    <main className="ambient-bg flex min-h-screen items-center justify-center p-6 text-center">
      <section className="glass-panel max-w-xl rounded-xl p-8">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-surface-container text-primary">
          <Icon name="travel_explore" />
        </div>
        <h1 className="font-display text-4xl font-bold text-navy">Page not found</h1>
        <p className="mt-3 text-secondary">This route is not available yet. Return home or continue your dashboard flow.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/">Go home</Button>
          <Button to="/login" variant="secondary">Sign in</Button>
        </div>
      </section>
    </main>
  );
}
