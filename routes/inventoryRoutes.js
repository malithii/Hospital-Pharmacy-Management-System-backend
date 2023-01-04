import { Router } from "express";
import {
  getAllInventory,
  getInventory,
  newInventory,
} from "../controllers/inventoryController.js";

const router = Router();

router.post("/new-inventory", newInventory);
router.post("/view-inventory", getInventory);
router.post("/all-inventory", getAllInventory);

export default router;
