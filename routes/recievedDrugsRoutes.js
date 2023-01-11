import { Router } from "express";
import {
  getAllRecievedDrugs,
  newRecievedDrugs,
} from "../controllers/recievedController.js";

const router = Router();

router.post("/new", newRecievedDrugs);
router.post("/getAll", getAllRecievedDrugs);

export default router;
