import { Route } from "./route";

export interface Workout {
  id: number;
  startTime: string;
  endTime: string;
  averageSpeed: number;
  maxSpeed: number;
  minAtmosphericPressure?: number;
  maxAtmosphericPressure?: number;
  avgAtmosphericPressure?: number;
  calories?: number;
  route: Route;
}
