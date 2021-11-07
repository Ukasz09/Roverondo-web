import { PlannedRoute, Post } from "@app/core/models";

export interface PlannedPostExtended extends Post {
  plannedRoute: PlannedRoute;
}
