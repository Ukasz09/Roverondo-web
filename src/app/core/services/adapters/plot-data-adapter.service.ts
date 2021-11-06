import { Injectable } from "@angular/core";
import { PostExtended, PlotData, Workout, Route } from "@app/core/models";
import { Adapter } from "./adapter";
import { Plots } from "../../models/data/plots";

@Injectable({
  providedIn: "root"
})
export class PlotDataAdapterService implements Adapter<Plots> {
  public adapt(route: Route): Plots {
    const speedPlot = { name: "speed", series: [] } as PlotData;
    const elevationPlot = { name: "elevation", series: [] } as PlotData;

    let index = 0;
    for (const { speed, elevation } of route.route) {
      if (speed) {
        speedPlot.series.push({
          name: index.toString(),
          value: speed
        });
      }
      elevationPlot.series.push({
        name: index.toString(),
        value: elevation
      });
      index++;
    }
    return { speed: speedPlot, elevation: elevationPlot } as Plots;
  }
}
