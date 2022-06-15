import jwt from "jsonwebtoken";

import { JWT_EXPIRATION_TIME, JWT_SECRET } from "../config/config";

const signJwtToken = (userId) => {
  const payload = { id: userId };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION_TIME,
  });
};

export default signJwtToken;
