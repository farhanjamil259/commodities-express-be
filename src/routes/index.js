import express from "express";
import authRoute from "../modules/auth/auth.route";
import bookRoute from "../modules/books/books.route";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/books", bookRoute);

export default router;
