import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
  findCategory,
} from "./category.controller";

// Middle wares
import protectRoute from "../../middleware/protectRoute";
import restrictRoute from "../../middleware/restrictRoute";

const router = express.Router();

router.post("/", [protectRoute, restrictRoute(["admin"])], createCategory);
router.get("/", protectRoute, getCategories);
router.delete("/:id", protectRoute, deleteCategory);
router.patch("/:id", protectRoute, updateCategory);
router.get("/find", protectRoute, findCategory);
export default router;
