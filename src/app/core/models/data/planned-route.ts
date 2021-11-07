import { Route } from "@app/core/models";

export interface PlannedRoute {
  createdAt: string;
  description: string;
  id: number;
  modifiedAt: string;
  title: string;
  route: Route;
}
