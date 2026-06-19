import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/navigation/Sidebar";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";

export default function DashboardLayout({ role }) {
  const navigate = useNavigate();

  return (
    <div className="ambient-bg min-h-screen text-on-background">
      <Sidebar role={role} />
      <div className="flex min-h-screen flex-col md:ml-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/30 bg-white/70 px-margin-mobile shadow-glass backdrop-blur-xl md:px-margin-desktop">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-secondary">{role} dashboard</p>
            <h1 className="font-display text-xl font-bold text-navy">CareerNest</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="h-11 w-11 p-0" onClick={() => navigate(`/${role}/notifications`)} aria-label="Notifications">
              <Icon name="notifications" />
            </Button>
            <Button to={role === "employer" ? "/employer/post-job" : "/jobs"} className="hidden sm:inline-flex">
              <Icon name={role === "employer" ? "add" : "search"} /> {role === "employer" ? "Post Job" : "Find Jobs"}
            </Button>
          </div>
        </header>
        <main className="flex-1 px-margin-mobile py-8 md:px-margin-desktop">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
