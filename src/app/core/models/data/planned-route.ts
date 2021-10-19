import { Moment } from "moment";
import { Route } from "./route";

export interface PlannedRoute {
  routeName: string;
  description: string;
  modifiedAt: Moment;
  createdAt: Moment;
  route: Route;
}
