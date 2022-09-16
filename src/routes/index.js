import express from "express";
import authRoute from "../modules/auth/auth.route";
import converterRoute from "../modules/converters/converter.route";
import categoryRoute from "../modules/categories/category.route";
import cartRoute from "../modules/carts/cart.route";
import uploadRoute from "../modules/uploads/upload.route";
import priceRoute from "../modules/prices/prices.route";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/converters", converterRoute);
router.use("/categories", categoryRoute);
router.use("/carts", cartRoute);
router.use("/upload", uploadRoute);
router.use("/prices", priceRoute);

export default router;
