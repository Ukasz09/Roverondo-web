import { Moment } from "moment";
import { Gender } from "./gender";

export interface User {
  name: string;
  lastName: string;
  email: string;
  profilePicture: string;
  city: string;
  bio: string;
  birthdate: Moment;
  gender: Gender;
  weight: number;
  maxHeartRate: number;
  dateJoined: Moment;
}
