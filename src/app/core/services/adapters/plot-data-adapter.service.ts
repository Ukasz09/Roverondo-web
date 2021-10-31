import { Injectable } from "@angular/core";
import { ActivityPostDetails, PlotData } from "@app/core/models";
import { Adapter } from "./adapter";

@Injectable({
  providedIn: "root"
})
export class PlotDataAdapterService implements Adapter<ActivityPostDetails> {
  public adapt(item: any): ActivityPostDetails {
    const postDetailsCopy: any = JSON.parse(JSON.stringify(item));
    postDetailsCopy.speedPlot = { name: "speed", series: postDetailsCopy.speedPlot } as PlotData;
    postDetailsCopy.elevationPlot = { name: "elevation", series: postDetailsCopy.elevationPlot } as PlotData;
    return postDetailsCopy;
  }
}
