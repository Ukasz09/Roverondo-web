import { Injectable } from "@angular/core";
import { Adapter } from "@app/core/services";
import { UserPlotData, UserStatisticsPeriod } from "@app/core/models";
import { Utils } from "@app/shared/utils";

@Injectable({
  providedIn: "root"
})
export class UserPlotDataAdapterService implements Adapter<UserPlotData> {
  public adapt(statisticsPeriods: UserStatisticsPeriod[]): UserPlotData {
    const userPlotData: UserPlotData = {
      activities: { name: "activities", series: [] },
      averageSpeed: { name: "averageSpeed", series: [] },
      distance: { name: "distance", series: [] },
      elevation: { name: "elevation", series: [] }
    };
    for (const stats of statisticsPeriods) {
      userPlotData.activities.series.push({ name: stats.from, value: stats.activities });
      userPlotData.averageSpeed.series.push({ name: stats.from, value: stats.avgSpeed });
      userPlotData.distance.series.push({ name: stats.from, value: stats.distance });
      userPlotData.elevation.series.push({ name: stats.from, value: stats.elevation });
    }
    return userPlotData;
  }

  public getMockedData(): UserStatisticsPeriod {
    const activities = Utils.randomNumber(0, 8);
    const avgSpeed = activities ? Utils.randomNumber(17, 45) : 0;
    const distance = activities ? Utils.randomNumber(activities * 15, 900) : 0;
    const elevation = activities ? Utils.randomNumber(970, 1250) : 0;
    return {
      from: new Date().toISOString(),
      to: new Date().toISOString(),
      activities,
      avgSpeed,
      distance,
      elevation
    };
  }

  public getMockedDataList(pointsQty = 100): UserStatisticsPeriod[] {
    const data: UserStatisticsPeriod[] = [];
    for (let i = 0; i < pointsQty; i++) {
      data.push(this.getMockedData());
    }
    return data;
  }
}
