import { Injectable } from "@angular/core";
import { AreaPlotData, Route } from "@app/core/models";
import { Adapter } from "./adapter";
import { Plots } from "../../models/data/plots";
import { PressureUnitPipe, SpeedUnitPipe } from "@app/shared/pipes";
import { DatePipe } from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class ActivityChartsDataAdapterService implements Adapter<Plots> {
  constructor(private readonly speedUnitPipe: SpeedUnitPipe, private readonly pressureUnitPipe: PressureUnitPipe) {
  }

  public adapt(route: Route): Plots {
    const speedPlot = { name: "speed", series: [] } as AreaPlotData;
    const elevationPlot = { name: "elevation", series: [] } as AreaPlotData;
    const pressurePlot = { name: "pressure", series: [] } as AreaPlotData;

    let index = 0;
    for (const { speed, elevation, pressure, timestamp } of route.route) {
      if (speed) {
        speedPlot.series.push({
          name: this.formatTimestamp(timestamp) || index.toString(),
          value: this.speedUnitPipe.transform(speed)
        });
      }

      if (pressure) {
        pressurePlot.series.push({
          name: this.formatTimestamp(timestamp) || index.toString(),
          value: this.pressureUnitPipe.transform(pressure)
        });
      }

      elevationPlot.series.push({
        name: this.formatTimestamp(timestamp) || index.toString(),
        value: elevation
      });
      index++;
    }
    return { speed: speedPlot, elevation: elevationPlot, pressure: pressurePlot } as Plots;
  }

  private formatTimestamp(timestamp: string): string | null {
    return new DatePipe("en-US").transform(timestamp, "mediumTime");
  }
}
