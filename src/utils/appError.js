class AppError extends Error {
  isOperational;

  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
