import { Router } from "express";
import {
  allWardUsers,
  newWardUser,
  updateWardUser,
} from "../controllers/wardUserController.js";

const router = Router();

router.post("/new-ward-user", newWardUser);
router.post("/update-ward-user", updateWardUser);
router.get("/all-ward-users", allWardUsers);

export default router;
