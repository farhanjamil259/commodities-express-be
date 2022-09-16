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

const router = express.Router();

router.post("/", [protectRoute], createConverter);
router.get("/", protectRoute, getConverters);
router.delete("/:id", [protectRoute], deleteConverter);
router.patch("/:id", [protectRoute], updateConverter);
router.get("/find", findConverter);

export default router;
