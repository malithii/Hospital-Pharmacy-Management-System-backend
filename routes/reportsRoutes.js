import { Router } from "express";

import {
  drugIssueReport,
  inventoryReport,
} from "../controllers/reportsController.js";

const router = Router();

router.post("/drugIssueReport", drugIssueReport);
router.post("/inventoryReport", inventoryReport);

export default router;
