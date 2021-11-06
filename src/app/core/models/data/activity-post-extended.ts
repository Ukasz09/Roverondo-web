import { Post } from './activity-post';
import { Workout } from './workout';

export interface PostExtended extends Post {
  workout: Workout;
}
