import { Router } from "express";
import {
  getAllInventory,
  getInventory,
  getNearestExpireDates,
  getWardInventory,
  inventoryChart,
  newInventory,
  newReorderLevel,
} from "../controllers/inventoryController.js";

const router = Router();

router.post("/new-inventory", newInventory);
router.post("/view-inventory", getInventory);
router.post("/all-inventory", getAllInventory);
router.post("/ward-inventory", getWardInventory);
router.post("/getNearestExpireDates", getNearestExpireDates);
router.post("/inventoryChart", inventoryChart);
router.post("/newReorderLevel", newReorderLevel);

export default router;
