import "dotenv/config";
import { cleanEnv, port, str } from "envalid";

/**
 * @description Validate environment variables
 * @returns {object} - Validated environment variables
 * @throws {Error} - Throws error if any of the environment variables are missing
 * @example
 * import validateEnv from "./utils/validateEnv";
 * const APP_PORT = validateEnv.APP_PORT;
 */
export default cleanEnv(process.env, {
  APP_NAME: str(),
  APP_PORT: port(),
  APP_URL: str(),
  NODE_ENV: str(),
  ALLOWED_ORIGINS: str(),

  // Database configuration
  DB_HOST: str(),
  DB_PORT: port(),
  DB_NAME: str(),
  DB_USER: str(),
  DB_PASSWORD: str(),
});
