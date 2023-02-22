import { Router } from "express";

import {
  drugIssueReport,
  inventoryReport,
  pharmacyDrugUsageChart,
} from "../controllers/reportsController.js";

const router = Router();

router.post("/drugIssueReport", drugIssueReport);
router.post("/inventoryReport", inventoryReport);
router.post("/pharmacyDrugUsageChart", pharmacyDrugUsageChart);

export default router;
