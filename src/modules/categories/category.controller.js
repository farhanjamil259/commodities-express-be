import Category from "./category.model";
import AppError from "../../utils/appError";
import catchAsync from "../../utils/catchAsync";

export const createCategory = catchAsync(async (req, res) => {
  const category = await Category.create(req.body);
  res.status(200).json({
    status: "success",
    data: { category },
  });
});
export const findCategory = catchAsync(async (req, res, next) => {
  const paramId = req.query.id;
  const paramName = req.query.name;
  let category;
  if (paramId) {
    category = await Category.findById(paramId);
  } else if (paramName) {
    category = await Category.find({
      name: { $regex: paramName, $options: "$i" },
    });
  }
  if (!category) {
    next(new AppError("category is not found", 404));
    return;
  }

  res.status(200).json({
    status: "success",
    data: { category },
  });
});
export const getCategories = catchAsync(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({ status: "success", data: { categories } });
});

export const deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    next(new AppError("category not found", 404));
    return;
  }

  res.status(200).json({
    status: "success",
    data: { category },
  });
});

export const updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!category) {
    next(new AppError("category not found", 404));
    return;
  }

  res.status(200).json({
    status: "success",
    data: { category },
  });
});
