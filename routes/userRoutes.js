import { Router } from "express";
import {
  allUsers,
  login,
  newUser,
  updateUser,
} from "../controllers/userController.js";
import requireAuth from "../middleware/authMiddleware.js";

const router = Router();

router.post("/new-user", newUser);
router.post("/update-user", updateUser);
router.get("/all-users", allUsers);
router.post("/login", login);

export default router;
