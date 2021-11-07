import { EventRoute, Post } from "@app/core/models";

export interface EventPostExtended extends Post {
  eventRoute: EventRoute;
}
