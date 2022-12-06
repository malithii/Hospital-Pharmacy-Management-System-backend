import { Router } from "express";
import { getOrders, newOrder } from "../controllers/orderController.js";

const router = Router();

router.post("/new-order", newOrder);
router.post("/get-orders", getOrders);

export default router;
