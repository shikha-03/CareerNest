import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Icon from "../../components/ui/Icon";
import usePageTitle from "../../hooks/usePageTitle";
import api from "../../services/api";
import { useState } from "react";

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "candidate", companyName: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  usePageTitle("Signup");

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await api.post("/auth/send-signup-otp", form);
      navigate(`/verify-email?email=${encodeURIComponent(form.email)}`);
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Could not send OTP. Check the email and SMTP settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="glass-panel w-full max-w-2xl rounded-xl p-6 md:p-10">
      <h1 className="font-display text-3xl font-bold text-navy">Create your CareerNest account</h1>
      <p className="mt-2 text-secondary">Start with the basics. Backend integration can replace this demo flow later.</p>
      <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
        {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
        <input value={form.name} onChange={(event) => updateField("name", event.target.value)} className="rounded-lg border border-outline-variant bg-white/75 px-4 py-3 outline-none focus:border-primary" placeholder="Full name" required />
        <input value={form.email} onChange={(event) => updateField("email", event.target.value)} className="rounded-lg border border-outline-variant bg-white/75 px-4 py-3 outline-none focus:border-primary" placeholder="Email address" type="email" required />
        <input value={form.password} onChange={(event) => updateField("password", event.target.value)} className="rounded-lg border border-outline-variant bg-white/75 px-4 py-3 outline-none focus:border-primary" placeholder="Password" type="password" required minLength={8} />
        <select value={form.role} onChange={(event) => updateField("role", event.target.value)} className="rounded-lg border border-outline-variant bg-white/75 px-4 py-3 outline-none focus:border-primary">
          <option value="candidate">Candidate</option>
          <option value="employer">Employer</option>
        </select>
        {form.role === "employer" && (
          <input value={form.companyName} onChange={(event) => updateField("companyName", event.target.value)} className="rounded-lg border border-outline-variant bg-white/75 px-4 py-3 outline-none focus:border-primary" placeholder="Company name" />
        )}
        <Button className="mt-2" type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending OTP..." : "Send OTP"} <Icon name="mark_email_read" /></Button>
      </form>
    </section>
  );
}
