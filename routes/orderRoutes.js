import { Router } from "express";
import {
  acceptOrder,
  getOrders,
  newOrder,
} from "../controllers/orderController.js";

const router = Router();

router.post("/new-order", newOrder);
router.post("/get-orders", getOrders);
router.post("/accept-order", acceptOrder);

export default router;
