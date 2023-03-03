import { Router } from "express";
import {
  checkBatchQuantity,
  getAllInventory,
  getInventory,
  getInventoryByDrug,
  getNearestExpireDates,
  getReorderLevelDrugs,
  getWardInventory,
  inventoryChart,
  newInventory,
  newReorderLevel,
  removeBatch,
  searchInventoryByDrug,
  updateReorderLevel,
} from "../controllers/inventoryController.js";

const router = Router();

router.post("/new-inventory", newInventory);
router.post("/view-inventory", getInventory);
router.post("/all-inventory", getAllInventory);
router.post("/ward-inventory", getWardInventory);
router.post("/getNearestExpireDates", getNearestExpireDates);
router.post("/inventoryChart", inventoryChart);
router.post("/newReorderLevel", newReorderLevel);
router.post("/updateReorderLevel", updateReorderLevel);
router.post("/getReorderLevelDrugs", getReorderLevelDrugs);
router.post("/checkBatchQuantity", checkBatchQuantity);
router.post("/getInventoryByDrug", getInventoryByDrug);
router.post("/searchInventoryByDrug", searchInventoryByDrug);
router.post("/removeBatch", removeBatch);

export default router;
