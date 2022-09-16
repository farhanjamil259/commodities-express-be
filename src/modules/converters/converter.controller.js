import Converter from "./converter.model";
import AppError from "../../utils/appError";
import catchAsync from "../../utils/catchAsync";

export const createConverter = catchAsync(async (req, res) => {
  const converter = await Converter.create(req.body);
  res.status(200).json({
    status: "success",
    data: { converter },
  });
});

export const findConverter = catchAsync(async (req, res, next) => {
  const paramId = req.query.id;
  const paramName = req.query.name;
  const partNumber = req.query.partNumber;
  let converter;
  if (paramId) {
    converter = await Converter.findById(paramId);
  } else if (partNumber) {
    converter = await Converter.find({
      partNumber: { $regex: partNumber },
    });
  } else if (paramName) {
    converter = await Converter.find({
      name: { $regex: paramName, $options: "i" },
    });
  }
  if (!converter) {
    next(new AppError("no converter found", 404));
    return;
  }

  res.status(200).json({
    status: "success",
    data: { converter },
  });
});

export const getConverters = catchAsync(async (req, res) => {
  const converters = await Converter.find();
  res.status(200).json({ status: "success", data: { converters } });
});

export const deleteConverter = catchAsync(async (req, res, next) => {
  const converter = await Converter.findByIdAndDelete(req.params.id);
  if (!converter) {
    next(new AppError("converter not found", 404));
    return;
  }

  res.status(200).json({
    status: "success",
    data: { converter },
  });
});

export const updateConverter = catchAsync(async (req, res, next) => {
  const converter = await Converter.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!converter) {
    next(new AppError("converter not found", 404));
    return;
  }

  res.status(200).json({
    status: "success",
    data: { converter },
  });
});
