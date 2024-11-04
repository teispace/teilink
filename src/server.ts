import "module-alias/register";
import env from "@/utils/validateEnv";
import app from "@/app";
import db from "@/config/db.config";
import redisConfig from "@/config/redis.config";

import dotenv from "dotenv";
dotenv.config();

const initiateServer = async () => {
  app.listen(env.APP_PORT, () => {
    console.log(`Server running at http://localhost:${env.APP_PORT}`);
  });
};

(async () => {
  try {
    // Check database connection
    await db.checkConnection();
    await db.createTableIfNotExists();

    // Connect to Redis
    await redisConfig.connect();
    console.log("Connected to Redis");

    // Start the server
    await initiateServer();
  } catch (error) {
    console.error("Error connecting to the services:", error);
    process.exit(1);
  } finally {
    process.on("SIGINT", async () => {
      await redisConfig.disconnect();
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      await redisConfig.disconnect();
      process.exit(0);
    });
  }
})();
