import express from "express";
import authRoute from "../modules/auth/auth.route";
import converterRoute from "../modules/converters/converter.route";
import categoryRoute from "../modules/categories/category.route";
import cartRoute from "../modules/carts/cart.route";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/converters", converterRoute);
router.use("/categories", categoryRoute);
router.use("/carts", cartRoute);

export default router;
