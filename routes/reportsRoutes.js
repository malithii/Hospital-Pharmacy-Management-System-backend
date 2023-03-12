import { Router } from "express";

import {
  drugIssueReport,
  inventoryReport,
  pharmacyDrugUsageChart,
  wardDrugUsageChart,
  wardDrugUsageReport,
} from "../controllers/reportsController.js";

const router = Router();

router.post("/drugIssueReport", drugIssueReport);
router.post("/inventoryReport", inventoryReport);
router.post("/pharmacyDrugUsageChart", pharmacyDrugUsageChart);
router.post("/wardDrugUsageChart", wardDrugUsageChart);
router.post("/wardDrugUsageReport", wardDrugUsageReport);

export default router;
