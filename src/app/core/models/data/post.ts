import { Visibility } from "./visibility";
import { Moment } from "moment";

export interface Post {
  title: string;
  description: string;
  visibility: Visibility;
  createdAt: Moment;
  modifiedAt: Moment;
  comments: Comment[];
}
