export interface PostComment {
  text: string;
  createdAt: string;
  modifiedAt: string;
  user: {
    "id": number,
    "nickname": string,
    "profilePicture"?: string
  };
  reactions: number;
}
