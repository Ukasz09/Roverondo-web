import { Injectable } from "@angular/core";
import { Adapter } from "@app/core/services";
import { AreaPlotData, UserPlotData, UserStatisticsPeriod } from "@app/core/models";
import { Utils } from "@app/shared/utils";
import { PlotBatchRange } from "@app/core/enums";

@Injectable({
  providedIn: "root"
})
export class UserPlotDataAdapterService implements Adapter<UserPlotData> {
  constructor() {
  }

  public adapt(statisticsPeriods: UserStatisticsPeriod[]): UserPlotData {
    const activities = [];
    const averageSpeed = [];
    const distance = [];
    const elevation = [];

    for (const stats of statisticsPeriods) {
      activities.push({ name: stats.from, value: Math.trunc(stats.activities) });
      if (stats.avgSpeed) {
        averageSpeed.push({ name: stats.from, value: stats.avgSpeed });
      }
      if (stats.distance) {
        distance.push({ name: stats.from, value: stats.distance });
      }
      if (stats.elevation) {
        elevation.push({ name: stats.from, value: Math.trunc(stats.elevation) });
      }
    }
    return {
      activities: activities,
      averageSpeed: averageSpeed,
      distance: distance,
      elevation: elevation
    };
  }

  public getMockedData(index: number): UserStatisticsPeriod {
    const activities = Math.trunc(Utils.randomNumber(0, 8));
    const avgSpeed = activities ? Utils.randomNumber(25, 35) : 0;
    const distance = activities ? Utils.randomNumber(activities * 15, 900) : 0;
    const elevation = activities ? Utils.randomNumber(970, 1250) : 0;
    return {
      from: (index - 1).toString(),
      to: index.toString(),
      activities,
      avgSpeed,
      distance,
      elevation
    };
  }

  public getMockedDataList(pointsQty = 50): UserStatisticsPeriod[] {
    const data: UserStatisticsPeriod[] = [];
    for (let i = 0; i < pointsQty; i++) {
      data.push(this.getMockedData(i + 1));
    }
    return data;
  }
}
