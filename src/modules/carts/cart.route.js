import express from "express";
import {
  createCart,
  getCart,
  getCarts,
  updateCart,
  deleteCart,
} from "./cart.controller";

// Middle wares
import protectRoute from "../../middleware/protectRoute";
import restrictRoute from "../../middleware/restrictRoute";

const router = express.Router();

router.post("/", [protectRoute, restrictRoute(["admin"])], createCart);
router.get("/", protectRoute, getCarts);
router.delete("/:id", protectRoute, deleteCart);
router.patch("/:id", protectRoute, updateCart);
router.get("/:id", protectRoute, getCart);
export default router;
