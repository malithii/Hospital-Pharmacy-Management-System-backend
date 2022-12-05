import { Router } from "express";
import {
  allDrugUsages,
  getDrugUsageByDate,
  newDrugUsage,
} from "../controllers/wardDrugUsageController.js";

const router = Router();

router.post("/new-drug-usage", newDrugUsage);
router.post("/view-bydate", getDrugUsageByDate);
router.post("/view-all", allDrugUsages);

export default router;
