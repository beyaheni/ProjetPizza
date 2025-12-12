import express from "express";
import { getRestaurants, getRestaurant, addRestaurant, updateRestaurant, deleteRestaurant } from "../controllers/restaurantController.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

router.get("/", getRestaurants);
router.get("/:id", getRestaurant);
router.post("/", isAdmin, addRestaurant);
router.put("/:id", isAdmin, updateRestaurant);
router.delete("/:id", isAdmin, deleteRestaurant);

export default router;
