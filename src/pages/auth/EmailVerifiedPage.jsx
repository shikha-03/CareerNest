import Button from "../../components/ui/Button";
import Icon from "../../components/ui/Icon";
import usePageTitle from "../../hooks/usePageTitle";

export default function EmailVerifiedPage() {
  usePageTitle("Email Verified");
  return (
    <section className="glass-panel w-full max-w-xl rounded-xl p-8 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-cyan text-white">
        <Icon name="check_circle" />
      </div>
      <h1 className="font-display text-3xl font-bold text-navy">Email verified</h1>
      <p className="mt-3 text-secondary">Your account is ready. Sign in to access your dashboard.</p>
      <Button to="/login" className="mt-8">Go to login</Button>
    </section>
  );
}
