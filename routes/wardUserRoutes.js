import { Router } from "express";
import {
  allWardUsers,
  login,
  newWardUser,
  updateWardUser,
} from "../controllers/wardUserController.js";
import requireAuth from "../middleware/authMiddleware.js";

const router = Router();

router.post("/new-ward-user", newWardUser);
router.post("/update-ward-user", updateWardUser);
router.get("/all-ward-users", allWardUsers);
router.post("/login", login);

export default router;
