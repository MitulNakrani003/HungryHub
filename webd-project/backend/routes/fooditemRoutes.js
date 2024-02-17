import express from "express";
const router = express.Router();
import {
  getFooditems,
  getFooditemById,
  deleteFooditem,
  createFooditem,
  updateFooditem,
  createFooditemReview,
  getTopFooditems,
} from "../controllers/fooditemController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getFooditems).post(protect, admin, createFooditem);
router.route("/:id/reviews").post(protect, createFooditemReview);
router.get("/top", getTopFooditems);
router
  .route("/:id")
  .get(getFooditemById)
  .delete(protect, admin, deleteFooditem)
  .put(protect, admin, updateFooditem);

export default router;
