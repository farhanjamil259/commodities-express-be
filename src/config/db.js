import mongoose from "mongoose";
import { DB_URI } from "./config";
import logger from "./logger";

const connectDb = async (next) => {
  try {
    logger.debug(DB_URI);
    logger.info("Connecting database...");

    await mongoose.connect(DB_URI);
    logger.info("Database Connected");

    next();
  } catch (err) {
    logger.error(err.message);
    logger.error("Process shutting down");

    process.exit(1);
  }
};

process.on("unhandledRejection", (err) => {
  logger.error(err.name, err.message);
  logger.error("Process shutting down");
  process.exit(1);
});

export default connectDb;
