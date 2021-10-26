import { Gender } from "./gender";

export interface User{
  id: string,
  name: string;
  lastName: string;
  email: string;
  profilePicture: string;
  city: string;
  bio: string;
  birthdate: string;
  gender: Gender;
  weight: number;
  maxHeartRate: number;
  dateJoined: string
}
