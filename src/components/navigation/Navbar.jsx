import { NavLink } from "react-router-dom";
import { APP_NAME } from "../../utils/constants";
import Button from "../ui/Button";
import Icon from "../ui/Icon";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-semibold transition ${isActive ? "bg-surface-container text-primary" : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/30 bg-white/75 shadow-glass backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-margin-mobile md:px-margin-desktop">
        <NavLink to="/" className="flex items-center gap-2">
          <Icon name="mobile_friendly" className="text-3xl text-primary" />
          <span className="font-display text-xl font-bold text-gradient">{APP_NAME}</span>
        </NavLink>
        <nav className="hidden items-center gap-2 md:flex">
          <NavLink className={linkClass} to="/">Home</NavLink>
          <NavLink className={linkClass} to="/jobs">Jobs</NavLink>
          <NavLink className={linkClass} to="/companies">Companies</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <Button to="/login" variant="ghost" className="hidden md:inline-flex">Sign In</Button>
          <Button to="/signup">Post a Job</Button>
        </div>
      </div>
    </header>
  );
}
