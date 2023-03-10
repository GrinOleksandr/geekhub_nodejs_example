import { basicInfo } from "./basicInfo";
import { user } from "./routes";
import { components } from "./components";

export const swaggerDocument = {
  ...basicInfo,
  ...components,
  paths: { ...user },
};
