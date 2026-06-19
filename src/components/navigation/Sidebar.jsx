import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { candidateNav, employerNav } from "../../utils/constants";
import Button from "../ui/Button";
import Icon from "../ui/Icon";

export default function Sidebar({ role }) {
  const { logout, user } = useAuth();
  const nav = role === "employer" ? employerNav : candidateNav;

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 flex-col border-r border-white/30 bg-white/65 py-6 shadow-xl backdrop-blur-2xl md:flex">
      <div className="px-6 pb-6">
        <span className="font-display text-2xl font-bold text-gradient">CareerNest</span>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-secondary">{role} workspace</p>
      </div>
      <nav className="flex-1 overflow-y-auto px-2">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === `/${role}`}
            className={({ isActive }) =>
              `mx-2 mb-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-on-surface-variant hover:translate-x-1 hover:bg-surface-container-high/70 hover:text-primary"}`
            }
          >
            <Icon name={item.icon} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="mx-6 border-t border-white/40 pt-5">
        <div className="mb-4 rounded-xl bg-white/50 p-3">
          <p className="font-semibold text-navy">{user?.name || "Alex Rivera"}</p>
          <p className="text-xs text-secondary">{role === "employer" ? "Hiring Manager" : "Senior Product Designer"}</p>
        </div>
        <Button variant="secondary" className="w-full" onClick={logout}>
          <Icon name="logout" /> Sign out
        </Button>
      </div>
    </aside>
  );
}
