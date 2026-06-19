import { Router } from "express";
import * as notificationController from "../controllers/notificationController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.use(protect);
router.get("/", notificationController.getNotifications);
router.patch("/read-all", notificationController.markAllRead);
router.patch("/:id/read", notificationController.markRead);
router.delete("/:id", notificationController.deleteNotification);

export default router;
