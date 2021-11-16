import { Gender } from "./gender";

export interface User {
  id: number;
  providerId: string;
  nickname: string;
  email: string;
  profilePicture?: string;
  city?: string;
  bio?: string;
  birthDate?: string;
  weight?: number;
  maxHeartRate?: number;
  dateJoined: string;
  gender: Gender;
}
