import * as dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { IS_DEV, IS_PROD, PORT } from "./config/config";
import connectDb from "./config/db";
import logger from "./config/logger";

connectDb(() => {
  app.listen(PORT, () => {
    logger.info(
      `Api is running on port : ${PORT} ${IS_DEV ? "(dev)" : ""}${
        IS_PROD ? "(prod)" : ""
      }`
    );
  });
});

/**
 * 1. Open Api document implementation
 * 2. Socket.IO Support
 * 3. Testing implementation
 */
