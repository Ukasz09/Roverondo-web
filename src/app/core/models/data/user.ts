import { Gender } from "./gender";

export interface User {
  name: string;
  lastName: string;
  email: string;
  profilePicture: string;
  city: string;
  bio: string;
  birthdate: Date;
  gender: Gender;
  weight: number;
  maxHeartRate: number;
  dateJoined: Date;
}
