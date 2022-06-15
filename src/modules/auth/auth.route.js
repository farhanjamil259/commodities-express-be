import express from "express";

import {
  forgotPassword,
  login,
  register,
  resetPassword,
} from "./auth.controller";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/forgotPassword", forgotPassword);

router.patch("/resetPassword", resetPassword);

export default router;
