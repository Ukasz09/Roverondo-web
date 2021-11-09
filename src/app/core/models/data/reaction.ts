export interface Reaction {
  id: number;
  user: {
    "id": number,
    "nickname": string,
    "profilePicture"?: string
  };
}
