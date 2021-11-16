import { Injectable } from "@angular/core";
import { Adapter, MockedSpeedAdapterService } from "@app/core/services";
import { PlotData, UserPlotData, UserStatisticsPeriod } from "@app/core/models";
import { Utils } from "@app/shared/utils";

@Injectable({
  providedIn: "root"
})
export class UserPlotDataAdapterService implements Adapter<UserPlotData> {
  constructor(private readonly mockedSpeedAdapter: MockedSpeedAdapterService) {
  }


  public adapt(statisticsPeriods: UserStatisticsPeriod[]): UserPlotData {
    const activities: PlotData = { name: "activities", series: [] };
    const averageSpeed: PlotData = { name: "averageSpeed", series: [] };
    const distance: PlotData = { name: "distance", series: [] };
    const elevation: PlotData = { name: "elevation", series: [] };

    for (const stats of statisticsPeriods) {
      activities.series.push({ name: stats.from, value: Math.trunc(stats.activities) });
      if (stats.avgSpeed) {
        averageSpeed.series.push({ name: stats.from, value: Math.trunc(stats.avgSpeed) });
      }
      if (stats.distance) {
        distance.series.push({ name: stats.from, value: Math.trunc(stats.distance) });
      }
      if (stats.elevation) {
        elevation.series.push({ name: stats.from, value: Math.trunc(stats.elevation) });
      }
    }
    return {
      activities: [activities],
      averageSpeed: [averageSpeed],
      distance: [distance],
      elevation: [elevation]
    };
  }

  public getMockedData(index: number): UserStatisticsPeriod {
    const activities = Math.trunc(Utils.randomNumber(0, 8));
    const avgSpeed = activities ? Utils.randomNumber(25, 35) : 0;
    const distance = activities ? Math.trunc(Utils.randomNumber(activities * 15, 900)) : 0;
    const elevation = activities ? Math.trunc(Utils.randomNumber(970, 1250)) : 0;
    return {
      from: (index - 1).toString(),
      to: index.toString(),
      activities,
      avgSpeed,
      distance,
      elevation
    };
  }

  public getMockedDataList(pointsQty = 100): UserStatisticsPeriod[] {
    const data: UserStatisticsPeriod[] = [];
    for (let i = 0; i < pointsQty; i++) {
      data.push(this.getMockedData(i + 1));
    }
    return data;
  }
}
