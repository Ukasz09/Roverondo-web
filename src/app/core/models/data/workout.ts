import { Route } from "./route";

export interface Workout {
  startTime: Date;
  endTime: Date;
  distance: number;
  averageSpeed: number;
  elevation: number;
  minAttitude: number;
  maxAttitude: number;
  minAtmosphericPressure: number;
  maxAtmosphericPressure: number;
  calories: number;
  location: string;
  route: Route;
}
