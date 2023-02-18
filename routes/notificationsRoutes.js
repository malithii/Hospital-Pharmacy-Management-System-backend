import { Router } from "express";
import {
  expireDateNotification,
  getUnreadNotifications,
  readNotification,
} from "../controllers/notificationsController.js";

const router = Router();

router.post("/expireDateNotification", expireDateNotification);
router.post("/getUnreadNotifications", getUnreadNotifications);
router.post("/readNotification", readNotification);

export default router;
