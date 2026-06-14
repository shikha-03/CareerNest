import Notification from "../models/Notification.js";
import { emitToUser } from "../socket/index.js";

export async function createNotification(data) {
  const notification = await Notification.create(data);
  emitToUser(notification.user.toString(), "notification:new", notification);
  return notification;
}
