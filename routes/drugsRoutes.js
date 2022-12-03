import { Router } from "express";
import {
  getAlldrugs,
  newDrug,
  removeDrug,
  updateDrug,
} from "../controllers/drugController.js";

const router = Router();

router.post("/new-drug", newDrug);
router.post("/update-drug", updateDrug);
router.post("/remove-drug", removeDrug);
router.get("/all-drugs", getAlldrugs);

export default router;
