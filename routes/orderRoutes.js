import { Router } from "express";
import {
  acceptOrder,
  getOrders,
  getPendingOrders,
  newOrder,
  saveQuantityReceived,
} from "../controllers/orderController.js";

const router = Router();

router.post("/new-order", newOrder);
router.post("/get-orders", getOrders);
router.post("/accept-order", acceptOrder);
router.post("/get-pending-orders", getPendingOrders);
router.post("/saveQuantityReceived", saveQuantityReceived);

export default router;
