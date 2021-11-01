import { User } from "./user";

export interface PostComment {
  text: string;
  createdAt: string;
  modifiedAt: string;
  user: User;
}
