import express, { NextFunction, Request, Response } from "express";
import { userController } from "./controllers";
import bodyparser from "body-parser";
import morgan from "morgan";
import cors from "cors-ts";
import helmet from "helmet";
import mongoose from "mongoose";
import { HttpError } from "./common/errors";
import { exceptionFilter } from "./common/errors/exception.filter";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./common/docs";
import bcrypt from "bcrypt";
import { config } from "./common/config";

export class App {
  app = express();
  port = config.app.port;

  useRoutes() {
    this.app.use("/users", userController.router);
    this.app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  useMiddlewares() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(
      morgan(':date[iso] ":method :url" :status :res[content-length]')
    );
    this.app.use(bodyparser.urlencoded({ extended: true }));
  }

  async initDb() {
    await mongoose.connect(
      `mongodb+srv://${config.db.userName}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.dbName}`
    );
    console.log("Database connection established successfully");

    console.log(
      "DB_FROM_CONFIG",
      `mongodb+srv://${config.db.userName}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.dbName}`
    );
  }

  throwError() {
    throw new HttpError(500, "Sasha error");
  }

  async init() {
    this.useMiddlewares();
    this.useRoutes();
    await this.initDb();

    this.app.all("/", async (req: Request, res: Response) => {
      res.send({ status: "ok" });
    });
    this.app.use(exceptionFilter.catch.bind(exceptionFilter)); // !!! Should be the last middleware!!!
    this.app.listen(this.port, () => {
      console.log(`Server is listening on http://localhost:${this.port}`);
    });

    process.on("uncaughtException", (err: Error) => {
      console.log("Uncaught error", err.message);
    });

    process.on("unhandledRejection", (err: Error) => {
      console.log("Uncaught ASYNC error", err.message);
    });

    // this.throwError();
  }
}

(async () => {
  const app = new App();
  await app.init();
})();

enum userRoles {
  USER = "user",
  ADMIN = "admin",
}

const usertype: userRoles = userRoles.USER;
