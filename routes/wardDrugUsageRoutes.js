import { Router } from "express";
import { newDrugUsage } from "../controllers/wardDrugUsageController.js";

const router = Router();

router.post("/new-drug-usage", newDrugUsage);
router.post("/get-drugusage-bydate", newDrugUsage);

export default router;
