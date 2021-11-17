import { AreaPlotData } from "@app/core/models";

export interface Plots {
  speed?: AreaPlotData;
  elevation: AreaPlotData;
  pressure?: AreaPlotData;
}
