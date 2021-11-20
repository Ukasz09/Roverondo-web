import { Component, Input, OnInit } from "@angular/core";
import { PlotData } from "@app/core/models";
import { Color } from "@swimlane/ngx-charts";
import { TimeRange } from "@app/core/enums";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-user-stat-chart",
  templateUrl: "./user-stat-chart.component.html",
  styleUrls: ["./user-stat-chart.component.scss"]
})
export class UserStatChartComponent implements OnInit {
  @Input() public chartName!: string;
  @Input() public weeklyChartData!: PlotData[];
  @Input() public monthlyChartData!: PlotData[];
  @Input() public colorScheme!: Color;
  @Input() public yScaleMin = 0;

  public readonly TimeRange = TimeRange;

  public timeRange = TimeRange.monthly;
  public xLabelBindFormatter!: (x: string) => string;

  private xWeeklyLabelTicks: number[] = [];

  constructor() {
  }

  public ngOnInit(): void {
    this.xWeeklyLabelTicks = this.getXLabelTicks(this.weeklyChartData);
    this.xLabelBindFormatter = this.chartFormat.bind(this);
  }

  public get plotData(): PlotData[] {
    return this.timeRange === TimeRange.monthly ? this.monthlyChartData : this.weeklyChartData;
  }

  private getXLabelTicks(plotData: PlotData[]): number[] {
    return plotData.map((_, i) => i % 4 === 0 ? i : -1).filter((i) => i !== -1);
  }

  private chartFormat(x: string): string {
    return (this.timeRange === TimeRange.weekly && this.weeklyChartData) ?
      this.xAxisLabelWeeklyFormat(x, this.weeklyChartData, this.xWeeklyLabelTicks) :
      this.formatXLabel(x);
  }

  private xAxisLabelWeeklyFormat(x: string, plotData: PlotData[], labelTicks: number[]): string {
    if (!labelTicks) {
      return this.formatXLabel(x);
    }
    if (plotData) {
      for (const index of labelTicks) {
        if (plotData.length >= index) {
          const xName = plotData[index].name;
          if (x === xName) {
            return this.formatXLabel(xName);
          }
        }
      }
    }
    return "";
  }

  private formatXLabel(xName: string): string {
    const dateTo = xName.split("-")[1];
    return new DatePipe("en-US").transform(dateTo, "MMMM yyyy") ?? "";
  }
}
