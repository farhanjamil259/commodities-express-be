export const ENVIRONMENT = process.env.ENVIRONMENT || "development";
export const IS_DEV = ENVIRONMENT === "development";
export const IS_PROD = ENVIRONMENT === "production";
export const PORT = process.env.PORT || 4000;
export const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/test";
export const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME || "30d";
