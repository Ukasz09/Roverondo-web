import { PostReaction } from "./post-reaction";

export interface CommentReaction {
  userId: string;
  postReaction: PostReaction;
}
