import { User } from './user';

export interface PostComment {
  id: string;
  text: string;
  createdAt: string;
  modifiedAt: string;
  user: User;
}
