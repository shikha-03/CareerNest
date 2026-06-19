import Button from "../../components/ui/Button";
import usePageTitle from "../../hooks/usePageTitle";

export default function ResetPasswordPage() {
  usePageTitle("Reset Password");
  return (
    <section className="glass-panel w-full max-w-xl rounded-xl p-8">
      <h1 className="font-display text-3xl font-bold text-navy">Choose a new password</h1>
      <form className="mt-8 space-y-4">
        <input className="w-full rounded-lg border border-outline-variant bg-white/75 px-4 py-3 outline-none focus:border-primary" placeholder="New password" type="password" />
        <input className="w-full rounded-lg border border-outline-variant bg-white/75 px-4 py-3 outline-none focus:border-primary" placeholder="Confirm password" type="password" />
        <Button to="/login" className="w-full">Save password</Button>
      </form>
    </section>
  );
}
