import { Router } from "express";
import {
  getAllCategories,
  newCategory,
} from "../controllers/categoryController.js";

const router = Router();

router.post("/new-category", newCategory);
router.post("/get-categories", getAllCategories);

export default router;
