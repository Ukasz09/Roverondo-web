import { PlannedPostExtended } from "@app/core/models";

export interface EventPostExtended extends PlannedPostExtended {
  alreadyJoined: boolean;
  enrolledUsers: number;
  startsAt: string;
}
