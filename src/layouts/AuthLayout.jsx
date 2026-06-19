import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="ambient-bg flex min-h-screen items-center justify-center p-margin-mobile md:p-margin-desktop">
      <Outlet />
    </main>
  );
}
