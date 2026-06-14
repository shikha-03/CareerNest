import Button from "../../components/ui/Button";
import Icon from "../../components/ui/Icon";
import usePageTitle from "../../hooks/usePageTitle";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  usePageTitle("Verify Email");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const response = await api.post("/auth/verify-signup-otp", { email, otp });
      const { token, user } = response.data.data;
      setSession({ token, user });
      navigate(user.role === "employer" ? "/employer" : "/candidate");
    } catch (apiError) {
      setError(apiError.response?.data?.message || "OTP verification failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="glass-panel w-full max-w-xl rounded-xl p-8 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-white">
        <Icon name="mail" />
      </div>
      <h1 className="font-display text-3xl font-bold text-navy">Verify your email</h1>
      <p className="mt-3 leading-7 text-secondary">Enter the 6-digit OTP sent to your inbox. The code expires in 5 minutes.</p>
      <form onSubmit={handleSubmit} className="mt-8 grid gap-4 text-left">
        {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
        <input value={email} onChange={(event) => setEmail(event.target.value)} className="rounded-lg border border-outline-variant bg-white/75 px-4 py-3 outline-none focus:border-primary" placeholder="Email address" type="email" required />
        <input value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))} className="rounded-lg border border-outline-variant bg-white/75 px-4 py-3 text-center text-2xl font-bold tracking-[0.4em] outline-none focus:border-primary" placeholder="000000" inputMode="numeric" required minLength={6} maxLength={6} />
        <Button className="w-full" type="submit" disabled={isSubmitting}>{isSubmitting ? "Verifying..." : "Verify OTP"}</Button>
      </form>
    </section>
  );
}
