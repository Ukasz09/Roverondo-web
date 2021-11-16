import { User, allTimeStatistics } from "@app/core/models";

export interface UserExtended extends User {
  allTimeStatistics: allTimeStatistics;
}
