import { Link } from "react-router-dom";

const variants = {
  primary: "bg-gradient-to-r from-primary to-cyan text-white shadow-lg shadow-primary/20 hover:-translate-y-0.5",
  secondary: "bg-white/70 text-primary border border-white/50 hover:bg-surface-container-low",
  ghost: "text-on-surface-variant hover:text-primary hover:bg-surface-container-high/60",
  danger: "bg-error text-white hover:bg-error/90"
};

export default function Button({ children, to, variant = "primary", className = "", ...props }) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all active:scale-95 ${variants[variant]} ${className}`;
  if (to) return <Link className={classes} to={to}>{children}</Link>;
  return <button className={classes} {...props}>{children}</button>;
}
