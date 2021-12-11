import * as config from "../../auth-config.dev.json";
import { environmentBase } from "./environment.base";

export const environment = {
  ...environmentBase(config),
  backendApi: "http://localhost:8080"
};
