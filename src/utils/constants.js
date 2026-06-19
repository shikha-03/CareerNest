export const APP_NAME = "CareerNest";
export const TAGLINE = "Connecting Talent with Opportunity";

export const roles = {
  candidate: "candidate",
  employer: "employer"
};

export const candidateNav = [
  { label: "Dashboard", icon: "dashboard", to: "/candidate" },
  { label: "Find Jobs", icon: "search", to: "/jobs" },
  { label: "Applications", icon: "description", to: "/candidate/applications" },
  { label: "Saved Jobs", icon: "bookmark", to: "/candidate/saved-jobs" },
  { label: "Notifications", icon: "notifications", to: "/candidate/notifications" },
  { label: "Settings", icon: "settings", to: "/candidate/settings" }
];

export const employerNav = [
  { label: "Dashboard", icon: "dashboard", to: "/employer" },
  { label: "Post a Job", icon: "add_box", to: "/employer/post-job" },
  { label: "Applicants", icon: "groups", to: "/employer/applicants" },
  { label: "Team", icon: "diversity_3", to: "/employer/team" },
  { label: "Notifications", icon: "notifications", to: "/employer/notifications" },
  { label: "Settings", icon: "settings", to: "/employer/settings" }
];
