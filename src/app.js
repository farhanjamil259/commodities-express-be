import express from "express";
import routes from "./routes";
import middlewareConfig from "./middleware";
import errorHandler from "./middleware/errorHandler";
import AppError from "./utils/appError";

const app = express();

middlewareConfig(app);

app.get("/", (_req, res) => {
  res.send("Api Online");
});

app.use("/api", routes);

//Handle unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl}`, 404));
});

//Global Error handler
app.use(errorHandler);

export default app;
