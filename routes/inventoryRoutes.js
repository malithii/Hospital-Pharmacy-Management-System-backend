import { Router } from "express";
import { newInventory } from "../controllers/inventoryController.js";

const router = Router();

router.post("/new-inventory", newInventory);

export default router;
