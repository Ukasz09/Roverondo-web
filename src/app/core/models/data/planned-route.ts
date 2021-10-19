import { Route } from "./route";

export interface PlannedRoute {
  routeName: string;
  description: string;
  modifiedAt: Date;
  createdAt: Date;
  route: Route;
}
