import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivityChartsDataAdapterService, LayoutService, WallPostsService } from "@app/core/services";
import { LayoutType, PlotColors, PostType } from "@app/core/enums";
import { ActivityType, AreaPlotData, EventPostExtended, PostExtended, Route } from "@app/core/models";
import { Color } from "@swimlane/ngx-charts";
import { Utils } from "@app/shared/utils";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-activity-details",
  templateUrl: "./activity-details.component.html",
  styleUrls: ["./activity-details.component.scss"]
})
export class ActivityDetailsComponent implements OnInit {
  @Input() public id!: string;
  @Input() public activity!: ActivityType;
  @Input() public type?: PostType;

  @Output() public exitDetailsClick = new EventEmitter<void>();

  public readonly numberFormat = ".2-2";
  public readonly elevationColorScheme = { domain: [PlotColors.elevation] } as Color;
  public readonly speedColorScheme = { domain: [PlotColors.speed] } as Color;
  public readonly pressureColorScheme = { domain: [PlotColors.pressure] } as Color;
  public readonly combinedColorScheme = { domain: this.elevationColorScheme.domain.concat(this.speedColorScheme.domain) } as Color;
  public readonly valueNotFoundPlaceholder = "N/A";
  public readonly xAxisFormatter = (_: string) => "";
  public readonly PostType = PostType;

  public speedPlotData: AreaPlotData[] = [];
  public elevationPlotData: AreaPlotData[] = [];
  public pressurePlotData: AreaPlotData[] = [];
  public combinedPlotData: AreaPlotData[] = [];

  constructor(
    private readonly layoutService: LayoutService,
    private readonly activitiesService: WallPostsService,
    private readonly plotDataAdapter: ActivityChartsDataAdapterService
  ) {
  }

  public ngOnInit(): void {
    this.parsePlotData();
  }

  public get isMobileLayout(): boolean {
    return this.layoutService.layoutType === LayoutType.ASIDE_MOBILE;
  }

  public get speedProvided(): boolean {
    return this.speedPlotData.length > 0 && this.speedPlotData[0].series.length > 0;
  }

  public get pressureProvided(): boolean {
    return this.pressurePlotData.length > 0 && this.pressurePlotData[0].series.length > 0;
  }

  public get avgSpeed(): number {
    if ("workout" in this.activity) {
      return this.activity.workout.averageSpeed;
    }
    return 0;
  }

  public get maxSpeed(): number {
    if ("workout" in this.activity) {
      return this.activity.workout.maxSpeed;
    }
    return 0;
  }

  public getRoute(): Route {
    if ("workout" in this.activity) {
      return this.activity.workout.route;
    }
    return this.activity.plannedRoute.route;
  }

  public getActivityDurationText(): string {
    if ("workout" in this.activity) {
      if (this.activity.workout.startTime && this.activity.workout.endTime) {
        const startDate = new Date(Date.parse(this.activity.workout.startTime));
        const endDate = new Date(Date.parse(this.activity.workout.endTime));
        const activityDuration = Utils.calcDeltaTime(startDate, endDate);
        return `${activityDuration.hour}h ${activityDuration.minute}min`;
      }
    }
    return this.valueNotFoundPlaceholder;
  }

  public get startTime(): string {
    return (this.activity as PostExtended).workout.startTime;
  }

  public get endTime(): string {
    return (this.activity as PostExtended).workout.endTime;
  }

  public get maxPressure(): number {
    return (this.activity as PostExtended).workout.maxAtmosphericPressure ?? 0;
  }

  public get minPressure(): number {
    return (this.activity as PostExtended).workout.minAtmosphericPressure ?? 0;
  }

  public get avgPressure(): number {
    return (this.activity as PostExtended).workout.avgAtmosphericPressure ?? 0;
  }

  public getEventStartDate(format = "longDate"): string {
    if (this.type == PostType.eventPost) {
      if ("startsAt" in this.activity) {
        const eventStartFullDate = this.activity.startsAt;
        const formattedDate = new DatePipe("en-US").transform(eventStartFullDate, format) ?? this.valueNotFoundPlaceholder;
        return eventStartFullDate ? formattedDate : this.valueNotFoundPlaceholder;
      }
    }
    return this.valueNotFoundPlaceholder;
  }

  public get eventStartTime(): string {
    return this.getEventStartDate("shortTime");
  }

  public get calories(): string {
    if ("workout" in this.activity) {
      const calories = this.activity.workout.calories;
      return calories ? `${calories} kcal` : "N/A";
    }
    return this.valueNotFoundPlaceholder;
  }

  private parsePlotData(): void {
    const route = this.getRoute();
    const plots = this.plotDataAdapter.adapt(route);

    this.elevationPlotData = [plots.elevation];
    if (plots.speed) {
      this.speedPlotData = [plots.speed];
    }
    if (plots.pressure) {
      this.pressurePlotData = [plots.pressure];
    }
    this.combinedPlotData = this.elevationPlotData.concat(this.speedPlotData);
  }
}
