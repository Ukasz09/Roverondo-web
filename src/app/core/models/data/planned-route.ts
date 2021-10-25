import { Route } from "./route";

export interface PlannedRoute {
  routeName: string;
  description: string;
  modifiedAt: string;
  createdAt: string;
  route: Route;
}
