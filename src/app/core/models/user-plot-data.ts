import { PlotData } from "./plot-data";

export interface UserPlotData {
  activities: PlotData[];
  averageSpeed: PlotData[];
  distance: PlotData[];
  elevation: PlotData[];
}
