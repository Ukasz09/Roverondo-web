import { Route } from './route';

export interface Workout {
  id: number;
  startTime: string;
  endTime: string;
  averageSpeed: number;
  minAtmosphericPressure: number;
  maxAtmosphericPressure: number;
  calories: number;
  route: Route;
}
