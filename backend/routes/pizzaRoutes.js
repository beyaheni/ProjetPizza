import express from "express";
import { getPizzas, getPizza, addPizza, updatePizza, deletePizza } from "../controllers/pizzaController.js";
import { isAdmin } from "../middleware/isAdmin.js";
const router = express.Router();

router.get("/", getPizzas);
router.get("/:id", getPizza);
router.post("/", isAdmin, addPizza);
router.put("/:id", isAdmin, updatePizza);
router.delete("/:id", isAdmin, deletePizza);

export default router;
