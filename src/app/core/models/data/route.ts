import { Point } from './point';

export interface Route {
  distance: number;
  elevation: number;
  minAltitude: number;
  maxAltitude: number;
  avgAltitude: number;
  location: string;
  route: Point[];
}
