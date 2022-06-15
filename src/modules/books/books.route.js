import express from "express";
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "./books.controller";

// Middlewares
import protectRoute from "../../middleware/protectRoute";
import restrictRoute from "../../middleware/restrictRoute";

const router = express.Router();

router.get("/", [protectRoute, restrictRoute(["admin"])], getBooks);

router.get("/:id", [protectRoute], getBook);

router.post("/", [protectRoute], createBook);

router.patch("/:id", [protectRoute], updateBook);

router.delete("/:id", [protectRoute, restrictRoute(["admin"])], deleteBook);

export default router;
