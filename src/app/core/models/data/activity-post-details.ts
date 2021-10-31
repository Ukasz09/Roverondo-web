import { ActivityPost } from "@app/core/models";
import { PlotData } from "../plot-data";

export interface ActivityPostDetails extends ActivityPost {
  speedPlot: PlotData,
  elevationPlot: PlotData,
}
