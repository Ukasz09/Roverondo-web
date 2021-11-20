import { Injectable } from "@angular/core";
import { Adapter } from "@app/core/services";
import { UserPlotData, UserStatisticsPeriod } from "@app/core/models";
import { Utils } from "@app/shared/utils";
import { TimeRange } from "@app/core/enums";
import { DatePipe } from "@angular/common";

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

    let index = 0;
    for (const stats of statisticsPeriods) {
      const labelName = this.getLabelName(stats.from, stats.to);
      activities.push({ name: labelName, value: Math.trunc(stats.activities) });
      if (stats.avgSpeed) {
        averageSpeed.push({ name: labelName, value: stats.avgSpeed });
      }
      if (stats.distance) {
        distance.push({ name: labelName, value: stats.distance });
      }
      if (stats.elevation) {
        elevation.push({ name: labelName, value: Math.trunc(stats.elevation) });
      }
      index++;
    }

    return {
      activities: activities,
      averageSpeed: averageSpeed,
      distance: distance,
      elevation: elevation
    };
  }

  public getMockedData(timeFrom: Date, timeTo: Date): UserStatisticsPeriod {
    const activities = Math.trunc(Utils.randomNumber(0, 8));
    const avgSpeed = activities ? Utils.randomNumber(25, 35) : 0;
    const distance = activities ? Utils.randomNumber(activities * 15, 900) : 0;
    const elevation = activities ? Utils.randomNumber(970, 1250) : 0;
    return {
      from: timeFrom.toISOString(),
      to: timeTo.toISOString(),
      activities,
      avgSpeed,
      distance,
      elevation
    };
  }

  public getMockedDataList(plotBatchRange = TimeRange.monthly): UserStatisticsPeriod[] {
    const data: UserStatisticsPeriod[] = [];
    const pointsQty = plotBatchRange === TimeRange.monthly ? 12 : 51;

    let startTime = new Date();
    let endTime = this.increaseEndTime(startTime, plotBatchRange);
    for (let i = 0; i < pointsQty; i++) {
      data.push(this.getMockedData(startTime, endTime));
      startTime = new Date(endTime);
      endTime = this.increaseEndTime(endTime, plotBatchRange);
    }
    return data;
  }

  private increaseEndTime(endTime: Date, plotBatchRange: TimeRange): Date {
    return plotBatchRange === TimeRange.monthly ?Utils.addMonthsToDate(endTime, 1) : Utils.addDaysToDate(endTime, 7);
  }


  private getLabelName(from: string, to: string): string {
    return `${this.formatDate(from)} - ${this.formatDate(to)}`;
  }

  private formatDate(date: string): string {
    return new DatePipe("en-US").transform(date, "d MMMM yyyy") ?? "";
  }
}
