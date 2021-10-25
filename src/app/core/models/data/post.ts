import { Visibility } from "./visibility";
import { PostComment } from "./post-comment";
import { PostReaction } from "./post-reaction";
import { User } from "./user";

export interface Post {
  id: string;
  title: string;
  description: string;
  visibility: Visibility;
  createdAt: string;
  modifiedAt: string;
  comments: PostComment[];
  reactions: PostReaction[];
  user: User;
}
