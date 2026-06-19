import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import usePageTitle from "../../hooks/usePageTitle";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  usePageTitle("Forgot Password");
  return (
    <section className="glass-panel w-full max-w-xl rounded-xl p-8">
      <h1 className="font-display text-3xl font-bold text-navy">Reset your password</h1>
      <p className="mt-2 text-secondary">Enter your email and we will send a reset link.</p>
      <form onSubmit={(event) => { event.preventDefault(); navigate("/reset-password"); }} className="mt-8 space-y-4">
        <input className="w-full rounded-lg border border-outline-variant bg-white/75 px-4 py-3 outline-none focus:border-primary" placeholder="Email address" type="email" />
        <Button className="w-full" type="submit">Send reset link</Button>
      </form>
    </section>
  );
}
