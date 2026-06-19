import { Outlet } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";

export default function PublicLayout() {
  return (
    <div className="ambient-bg min-h-screen overflow-x-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
