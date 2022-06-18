import Cart from "./cart.model";
import AppError from "../../utils/appError";
import catchAsync from "../../utils/catchAsync";

// Create Cart
export const createCart = catchAsync(async (req, res) => {
  const cart = await Cart.create(req.body);
  res.status(200).json({
    status: "success",
    data: { cart },
  });
});

export const getCarts = catchAsync(async (req, res) => {
  const carts = await Cart.find();
  res.status(200).json({
    status: "success",
    data: { carts },
  });
});

export const getCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findById(req.params.id);
  if (!cart) {
    next(new AppError("Cart not found"));
    return;
  }
  res.status(200).json({
    status: "success",
    data: { cart },
  });
});

export const updateCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!cart) {
    next(new AppError("Cart not found"));
    return;
  }
  res.status(200).json({
    status: "success",
    data: { cart },
  });
});
export const deleteCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findByIdAndDelete(req.params.id);
  if (!cart) {
    next(new AppError("Cart not found"));
    return;
  }
  res.status(200).json({
    status: "success",
    data: { cart },
  });
});
