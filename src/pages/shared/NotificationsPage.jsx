import NotificationCard from "../../components/cards/NotificationCard";
import { notifications } from "../../utils/data";
import usePageTitle from "../../hooks/usePageTitle";

export default function NotificationsPage() {
  usePageTitle("Notifications");
  return (
    <div>
      <h1 className="mb-6 font-display text-3xl font-bold text-navy">Notifications</h1>
      <div className="grid gap-4">{notifications.map((item) => <NotificationCard key={item.id} item={item} />)}</div>
    </div>
  );
}
