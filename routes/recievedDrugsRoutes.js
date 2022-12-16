import { Router } from "express";
import { newRecievedDrugs } from "../controllers/recievedController.js";

const router = Router();

router.post("/new", newRecievedDrugs);

export default router;
