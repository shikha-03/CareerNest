import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/ui/Button";
import Icon from "../../components/ui/Icon";
import usePageTitle from "../../hooks/usePageTitle";

export default function LoginPage() {
  const [role, setRole] = useState("candidate");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  usePageTitle("Login");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const user = await login({ email, password, role });
      navigate(user.role === "employer" ? "/employer" : "/candidate");
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Login failed. Check your email and password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="glass-panel grid w-full max-w-6xl overflow-hidden rounded-xl lg:grid-cols-12">
      <div className="relative overflow-hidden bg-surface p-8 lg:col-span-5 lg:p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-surface-variant via-white to-cyan/10" />
        <div className="relative flex min-h-[360px] flex-col justify-between">
          <Link to="/" className="flex items-center gap-2 font-display text-2xl font-bold text-gradient">
            <Icon name="mobile_friendly" /> CareerNest
          </Link>
          <div>
            <h1 className="font-display text-4xl font-extrabold leading-tight text-primary md:text-5xl">Elevate your professional path.</h1>
            <p className="mt-5 max-w-sm leading-7 text-secondary">Join an exclusive network of talent and forward-thinking companies.</p>
          </div>
        </div>
      </div>
      <div className="bg-white/85 p-6 lg:col-span-7 lg:p-12">
        <div className="mx-auto max-w-md">
          <h2 className="font-display text-3xl font-bold text-navy">Welcome back</h2>
          <p className="mt-2 text-secondary">Please enter your details to sign in.</p>
          <div className="my-8 grid grid-cols-2 rounded-lg bg-surface-container-low p-1">
            {["candidate", "employer"].map((item) => (
              <button key={item} type="button" onClick={() => setRole(item)} className={`rounded-md py-3 text-sm font-bold capitalize transition ${role === item ? "bg-primary text-white shadow" : "text-secondary hover:bg-white/60"}`}>{item}</button>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
            <label className="block">
              <span className="sr-only">Email</span>
              <input value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-lg border border-outline-variant bg-white/70 px-4 py-3 outline-none focus:border-primary" placeholder="Email address" type="email" required />
            </label>
            <label className="block">
              <span className="sr-only">Password</span>
              <input value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-lg border border-outline-variant bg-white/70 px-4 py-3 outline-none focus:border-primary" placeholder="Password" type="password" required />
            </label>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-secondary"><input type="checkbox" /> Remember me</label>
              <Link className="font-semibold text-primary" to="/forgot-password">Forgot password?</Link>
            </div>
            <Button className="w-full" type="submit" disabled={isSubmitting}>{isSubmitting ? "Signing in..." : "Sign in"} <Icon name="arrow_forward" /></Button>
          </form>
          <p className="mt-6 text-center text-sm text-secondary">New to CareerNest? <Link className="font-semibold text-primary" to="/signup">Create account</Link></p>
        </div>
      </div>
    </section>
  );
}
