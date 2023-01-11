import { Router } from "express";
import {
  drugCategoryChart,
  getAllCategories,
  newCategory,
} from "../controllers/categoryController.js";

const router = Router();

router.post("/new-category", newCategory);
router.post("/get-categories", getAllCategories);
router.post("/drugcategorychart", drugCategoryChart);

export default router;
