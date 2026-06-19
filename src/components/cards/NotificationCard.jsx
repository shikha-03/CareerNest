import { Link } from "react-router-dom";
import Icon from "../ui/Icon";

export default function NotificationCard({ item }) {
  return (
    <Link to={item.to} className="glass-card flex gap-4 rounded-xl p-4 transition hover:-translate-y-0.5">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white ${item.tone === "cyan" ? "bg-cyan" : "bg-primary"}`}>
        <Icon name="notifications" />
      </span>
      <span>
        <span className="block font-semibold text-navy">{item.title}</span>
        <span className="mt-1 block text-sm leading-6 text-secondary">{item.body}</span>
      </span>
    </Link>
  );
}
