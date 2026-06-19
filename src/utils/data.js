export const jobs = [
  {
    id: "senior-product-designer",
    title: "Senior Product Designer",
    company: "TechNova Labs",
    location: "Remote, United States",
    type: "Full-time",
    salary: "$125k - $155k",
    tags: ["Product Design", "Figma", "SaaS"],
    posted: "2 days ago",
    description: "Lead end-to-end product design for a modern hiring intelligence platform used by fast-growing companies."
  },
  {
    id: "frontend-engineer",
    title: "Frontend Engineer",
    company: "BrightPath AI",
    location: "Bengaluru / Remote",
    type: "Full-time",
    salary: "$95k - $130k",
    tags: ["React", "TypeScript", "Tailwind"],
    posted: "4 days ago",
    description: "Build polished interfaces, reusable systems, and data-rich dashboards for career discovery workflows."
  },
  {
    id: "talent-acquisition-lead",
    title: "Talent Acquisition Lead",
    company: "CloudHarbor",
    location: "New York, NY",
    type: "Hybrid",
    salary: "$110k - $140k",
    tags: ["Recruiting", "Leadership", "Analytics"],
    posted: "1 week ago",
    description: "Own sourcing strategy, candidate experience, and hiring analytics for a global product organization."
  }
];

export const companies = [
  { name: "TechNova Labs", industry: "SaaS", jobs: 12, location: "San Francisco" },
  { name: "BrightPath AI", industry: "Artificial Intelligence", jobs: 8, location: "Bengaluru" },
  { name: "CloudHarbor", industry: "Cloud Infrastructure", jobs: 15, location: "New York" }
];

export const notifications = [
  { id: 1, title: "Application viewed", body: "TechNova Labs viewed your Senior Product Designer application.", to: "/candidate/applications", tone: "primary" },
  { id: 2, title: "New applicant", body: "Priya Shah applied for Frontend Engineer.", to: "/employer/applicants", tone: "cyan" },
  { id: 3, title: "Interview scheduled", body: "Your interview with BrightPath AI is confirmed for Friday.", to: "/candidate/applications", tone: "primary" }
];

export const applicants = [
  { name: "Priya Shah", role: "Frontend Engineer", stage: "Interview", match: "94%" },
  { name: "Marcus Chen", role: "Product Designer", stage: "Shortlisted", match: "91%" },
  { name: "Ava Johnson", role: "Talent Lead", stage: "Screening", match: "88%" }
];
