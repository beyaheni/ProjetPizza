import express from "express";
import { getOrders, getOrder, addOrder, updateOrder, deleteOrder } from "../controllers/orderController.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

router.get("/", getOrders);
router.get("/:id", getOrder);
router.post("/", isAdmin, addOrder);
router.put("/:id", isAdmin, updateOrder);
router.delete("/:id", isAdmin, deleteOrder);

export default router;
