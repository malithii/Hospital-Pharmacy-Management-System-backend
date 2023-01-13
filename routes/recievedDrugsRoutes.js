import { Router } from "express";
import {
  getAllRecievedDrugs,
  getRecieved,
  newRecievedDrugs,
} from "../controllers/recievedController.js";

const router = Router();

router.post("/new", newRecievedDrugs);
router.post("/getAll", getAllRecievedDrugs);
router.post("/get", getRecieved);

export default router;
