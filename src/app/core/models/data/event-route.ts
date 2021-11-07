import { Route } from "./route";

export interface EventRoute {
  createdAt: string;
  description: string;
  id: number;
  modifiedAt: string;
  title: string;
  eventStartDate: string;
  eventDurationTime: string;
  route: Route;
}
