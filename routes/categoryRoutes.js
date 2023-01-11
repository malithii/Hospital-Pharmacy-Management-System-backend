import { Router } from "express";
import {
  drugCategoryChart,
  getAllCategories,
  newCategory,
  updateCategory,
} from "../controllers/categoryController.js";

const router = Router();

router.post("/new-category", newCategory);
router.post("/get-categories", getAllCategories);
router.post("/drugcategorychart", drugCategoryChart);
router.post("/categoryupdate", updateCategory);

export default router;
