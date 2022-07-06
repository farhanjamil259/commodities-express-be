import jwt from "jsonwebtoken";
import pify from "pify";

// Configs
import { JWT_SECRET } from "../config/config";

// Utils
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

// Models
import User, { UserDocument } from "../modules/auth/user.model";

// Interfaces
import changedPasswordAfter from "../utils/changedPasswordAfter";

// Convert jwt.verify to promised based function
const asyncJwtVerify = pify(jwt.verify, { multiArgs: true });

const protectRoute = catchAsync(async (req, _res, next) => {
  // Get Authorization string from header
  const { authorization } = req.headers;

  // Get token from authorization string
  let token;

  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
  }

  // Return if no token exists
  if (!token) {
    return next(
      new AppError("You are not logged in to perform this request", 401)
    );
  }

  // Check if token is valid
  const decoded = await asyncJwtVerify(token, JWT_SECRET);

  // Check if the user was deleted after token was generated
  const latestUser = await User.findById(decoded[0].id)
    .select("+password")
    .select("+passwordChangedAt");

  if (!latestUser)
    return next(new AppError("This tokens user no longer exists", 401));

  if (changedPasswordAfter(latestUser.passwordChangedAt, decoded[0].iat)) {
    return next(
      new AppError("Password has been changed, please login again", 401)
    );
  }

  req.user = latestUser;

  next();
});

export default protectRoute;
