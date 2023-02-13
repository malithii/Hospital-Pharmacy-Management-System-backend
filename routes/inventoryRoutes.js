import { Router } from "express";
import {
  getAllInventory,
  getInventory,
  getNearestExpireDates,
  getWardInventory,
  newInventory,
} from "../controllers/inventoryController.js";

const router = Router();

router.post("/new-inventory", newInventory);
router.post("/view-inventory", getInventory);
router.post("/all-inventory", getAllInventory);
router.post("/ward-inventory", getWardInventory);
router.post("/getNearestExpireDates", getNearestExpireDates);

export default router;
