import env from "@/utils/validateEnv";
import express, { Request, Response, json, urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";
import urlRoutes from "@/routes/url.routes";

class App {
  public expressApp: express.Application;

  constructor() {
    this.expressApp = express();
    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddleware(): void {
    // Middleware
    this.expressApp.use(helmet());
    this.expressApp.use(json({ limit: "10mb" }));
    this.expressApp.use(urlencoded({ extended: true, limit: "10mb" }));
    this.expressApp.set("view engine", "ejs");
    this.expressApp.use(express.static("public"));

    // CORS configuration to allow only specific origins
    const corsOptions: cors.CorsOptions = {
      origin: (origin, callback) => {
        if (!origin || origin === "null") {
          // Allow null origin
          return callback(null, true);
        }
        console.log("Origin:", origin);
        console.log("Allowed origins:", env.ALLOWED_ORIGINS);
        if (env.ALLOWED_ORIGINS.split(",").includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    };

    // CORS middleware
    this.expressApp.use(cors(corsOptions));
    this.expressApp.set("trust proxy", 1);

    this.expressApp.use("/", urlRoutes);
  }

  private initializeRoutes(): void {
    // Define your routes here
    // Example: this.expressApp.use("/api/example", exampleRoutes);

    // Catch 404 and forward to error handler
    this.expressApp.use((req: Request, res: Response) => {
      res.status(404).end();
    });
  }

  private initializeErrorHandling(): void {
    // Handle all errors
    this.expressApp.use((err: Error, req: Request, res: Response) => {
      console.error(err.stack);
      res.status(500).send("Something broke!");
    });
  }
}

export default new App().expressApp;
