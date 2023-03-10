import dotenv from "dotenv";
import { IConfig } from "./types-and-interfaces";
dotenv.config();

export const config: IConfig = {
  app: {
    port: Number.parseInt(process.env.PORT || "8000", 10),
  },
  db: {
    mongoUrl: process.env.MONGO_URL || "",
  },
};
