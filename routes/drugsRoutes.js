import { Router } from "express";
import {
  getAlldrugs,
  getDrugIds,
  newDrug,
  removeDrug,
  updateDrug,
} from "../controllers/drugController.js";

const router = Router();

router.post("/new-drug", newDrug);
router.post("/update-drug", updateDrug);
router.post("/remove-drug", removeDrug);
router.post("/all-drugs", getAlldrugs);
router.post("/drug-by-id", getDrugIds);

export default router;
