import { Router } from "express";
import {
  getDrugUsageByDate,
  newDrugUsage,
} from "../controllers/wardDrugUsageController.js";

const router = Router();

router.post("/new-drug-usage", newDrugUsage);
router.post("/view-bydate", getDrugUsageByDate);

export default router;
