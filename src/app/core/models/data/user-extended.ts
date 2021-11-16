import { User, UserSummarizedStatistics } from "@app/core/models";

export interface UserExtended extends User {
  allTimeStatistics: UserSummarizedStatistics;
}
