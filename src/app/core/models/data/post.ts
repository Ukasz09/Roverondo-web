export interface Post {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  modifiedAt: null;
  postType: string;
  commentsCount: number;
  reactionsCount: number;
  user: {
    id: number;
    nickname: string;
    profilePicture: string;
    city: string;
  };
  alreadyReactedTo: boolean;
}
