import { Visibility } from "./visibility";
import { PostComment } from "./post-comment";
import { PostReaction } from "./post-reaction";

export interface Post {
  title: string;
  description: string;
  visibility: Visibility;
  createdAt: Date;
  modifiedAt: Date;
  comments: PostComment[];
  reactions: PostReaction[];
}
