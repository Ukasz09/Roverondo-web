import * as config from "../../auth-config.prod.json";
import { environmentBase } from "./environment.base";

export const environment = {
  ...environmentBase(config),
  backendApi: "https://roverondo.link"
};
