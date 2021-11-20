import { User, AllTimeStatistics } from "@app/core/models";

export interface UserExtended extends User {
  allTimeStatistics: AllTimeStatistics;
}
