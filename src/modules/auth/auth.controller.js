import { NextFunction, Request, Response } from "express";

import User from "./user.model";
import AppError from "../../utils/appError";
import catchAsync from "../../utils/catchAsync";
import signJwtToken from "../../utils/signJwtToken";
import compareHashPass from "../../utils/compareHashPass";
import generatePasswordResetToken from "../../utils/generatePasswordResetToken";
import sendMail from "../../utils/sendMail";

export const register = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    image: req.body.image,
    role: req.body.role,
    password: req.body.password,
    passwordChangedAt: "2020-04-04",
  });

  const token = signJwtToken(newUser.id);

  res.status(201).json({
    status: "success",
    token,
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Email and Password are required", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  const matched = await compareHashPass(password, user?.password);

  if (!matched || !user) {
    return next(new AppError("Invalid email or password", 401));
  }

  const token = signJwtToken(user.id);

  res.status(200).json({
    status: "success",
    token,
  });
});

export const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return next(new AppError("Email address does not exist", 404));

  const resetToken = generatePasswordResetToken();
  const resetTokenExpiriy = Date.now() + 10 * 60 * 1000;

  await user.updateOne({
    passwordResetToken: resetToken,
    passwordResetTime: resetTokenExpiriy,
  });

  await sendMail({
    receipientEmail: user.email,
    subject: "This is a test subject",
    text: "This is a test body of the email",
  });

  res.status(200).json({
    message: "Token generated",
  });
});

export const resetPassword = catchAsync(async (req, res, next) => {
  res.send("RESET PASSWORD ROUTE");
});
