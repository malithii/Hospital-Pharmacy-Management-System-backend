import { Router } from "express";
import {
  getALLDrugUsage,
  getDrugUsageByMonth,
  newDrugUsage,
} from "../controllers/wardDrugUsageController.js";

const router = Router();

router.post("/new-drug-usage", newDrugUsage);
router.post("/view-bymonth", getDrugUsageByMonth);
router.post("/usage-history", getALLDrugUsage);

export default router;
