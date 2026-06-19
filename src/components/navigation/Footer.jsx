import { Link } from "react-router-dom";
import { APP_NAME, TAGLINE } from "../../utils/constants";
import Icon from "../ui/Icon";

export default function Footer() {
  return (
    <footer className="border-t border-outline-variant bg-surface-container-low">
      <div className="mx-auto grid max-w-7xl gap-8 px-margin-mobile py-12 md:grid-cols-4 md:px-margin-desktop">
        <div>
          <div className="flex items-center gap-2">
            <Icon name="mobile_friendly" className="text-primary" />
            <span className="font-display font-bold text-primary">{APP_NAME}</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-secondary">{TAGLINE}</p>
        </div>
        {["Platform", "For Talent", "For Employers"].map((heading) => (
          <div key={heading}>
            <h3 className="mb-3 text-sm font-bold text-navy">{heading}</h3>
            <div className="flex flex-col gap-2 text-sm text-secondary">
              <Link to="/jobs">Find jobs</Link>
              <Link to="/companies">Companies</Link>
              <Link to="/login">Sign in</Link>
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}
