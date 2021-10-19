import { Moment } from "moment";

export interface Comment {
  text: string;
  createdAt: Moment;
  modifiedAt: Moment;
}
