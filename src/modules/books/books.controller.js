import Book from "./books.model";
import AppError from "../../utils/appError";
import catchAsync from "../../utils/catchAsync";

export const getBooks = catchAsync(async (req, res) => {
  const books = await Book.find();
  res.status(200).json({
    status: "success",
    data: {
      books,
    },
  });
});

export const getBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    next(new AppError("No Book Found", 404));
    return;
  }

  res.status(200).json({
    status: "success",
    data: {
      book,
    },
  });
});

export const createBook = catchAsync(async (req, res) => {
  const book = await Book.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      book,
    },
  });
});

export const updateBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!book) {
    next(new AppError("No Book Found", 404));
    return;
  }

  res.status(200).json({
    status: "success",
    data: {
      book,
    },
  });
});

export const deleteBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.id);

  if (!book) {
    next(new AppError("No Book Found", 404));
    return;
  }

  res.status(200).json({
    status: "success",
    data: {
      book,
    },
  });
});
