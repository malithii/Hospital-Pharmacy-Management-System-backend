import { Router } from "express";
import {
  newPharmacist,
  updatePharmacist,
} from "../controllers/pharmacistController.js";

const router = Router();

router.post("/new-pharmacist", newPharmacist);
router.post("/update-pharmacist", updatePharmacist);

export default router;
