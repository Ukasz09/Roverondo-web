import { Post } from "./post";
import { Workout } from "./workout";

export interface ActivityPost extends Post {
  workout: Workout;
}
