import { Router } from "express";
import {
  getAllStoreTemps,
  newStoreTemp,
} from "../controllers/storeTempController.js";

const router = Router();

router.post("/new-storeTemp", newStoreTemp);
router.post("/get-storeTemps", getAllStoreTemps);

export default router;
