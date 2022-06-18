import express from "express";
import {
  createConverter,
  deleteConverter,
  getConverters,
  updateConverter,
  findConverter,
} from "./converter.controller";

// Middle wares
import protectRoute from "../../middleware/protectRoute";
import restrictRoute from "../../middleware/restrictRoute";

const router = express.Router();

router.post("/", [protectRoute, restrictRoute(["admin"])], createConverter);
router.get("/", protectRoute, getConverters);
router.delete(
  "/:id",
  [protectRoute, restrictRoute(["admin"])],
  deleteConverter
);
router.patch("/:id", [protectRoute, restrictRoute(["admin"])], updateConverter);
router.get("/find", findConverter);
export default router;
