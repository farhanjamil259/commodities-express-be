import AppError from "../utils/appError";

const restrictRoute = (roles) => {
  return (req, res, next) => {
    console.log(roles);

    if (!roles?.includes(req.user.role)) {
      return next(
        new AppError("You do not have permissions to perform this request", 403)
      );
    }

    next();
  };
};

export default restrictRoute;
