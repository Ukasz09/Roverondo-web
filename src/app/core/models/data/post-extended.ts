import { Post } from './post';
import { Workout } from './workout';

export interface PostExtended extends Post {
  workout: Workout;
}
