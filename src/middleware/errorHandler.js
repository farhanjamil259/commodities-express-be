// Config Imports
import { IS_DEV, IS_PROD } from "../config/config";
import logger from "../config/logger";

// Utility Imports
import AppError from "../utils/appError";

const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsErrorDB = (err) => {
  const message = `Duplicate field value of ${Object.keys(err.keyValue)[0]}: ${
    Object.values(err.keyValue)[0]
  }`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;

  return new AppError(message, 400);
};

const handleJsonWebTokenError = () => {
  const message = "Invalid Token";

  return new AppError(message, 401);
};

const handleTokenExpiredToken = () => {
  const message = "Your token has expried, please relogin";

  return new AppError(message, 401);
};

const sendErrorDev = (err, res) => {
  const { message, statusCode, stack, status, isOperational } = err;

  res.status(err.statusCode).json({
    error: err,
    message,
    statusCode,
    stack,
    status,
    isOperational,
  });
};

const sendErrorProd = (err, res) => {
  const { message, statusCode } = err;

  res.status(err.statusCode).json({
    statusCode,
    message,
  });
};

const errorHandler = (err, _req, res, _next) => {
  err.statusCode = err.statusCode || 500;

  if (IS_DEV) {
    sendErrorDev(err, res);
  } else if (IS_PROD) {
    let error = { ...err };
    logger.error(err);

    //handle invalid Id error
    if (error.name === "CastError") error = handleCastError(error);

    //Handle mongo duplicate fields error
    if (err.code === 11000) error = handleDuplicateFieldsErrorDB(error);

    //Hanlde mongo validation errors

    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);

    if (Object.values(error)[0].name === "JsonWebTokenError")
      error = handleJsonWebTokenError();

    if (Object.values(error)[0].name === "TokenExpiredToken")
      error = handleTokenExpiredToken();

    sendErrorProd(error, res);
  }
};

export default errorHandler;
