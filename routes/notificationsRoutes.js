import { Router } from "express";
import {
  expireDateNotification,
  getUnreadNotifications,
} from "../controllers/notificationsController.js";

const router = Router();

router.post("/expireDateNotification", expireDateNotification);
router.post("/getUnreadNotifications", getUnreadNotifications);

export default router;
