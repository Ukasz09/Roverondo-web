import { Point } from './point';

export interface Route {
  distance: number;
  elevation: number;
  minAttitude: number;
  maxAttitude: number;
  location: string;
  route: Point[];
}
