import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivitiesService, LayoutService, PlotDataAdapterService } from "@app/core/services";
import { LayoutType, PlotColors, PostType } from "@app/core/enums";
import { PlannedPostExtended, PlotData, PostExtended, Route } from "@app/core/models";
import { Color } from "@swimlane/ngx-charts";
import { ActivitiesRoutes } from "@app/routes/activities";

@Component({
  selector: "app-activity-details",
  templateUrl: "./activity-details.component.html",
  styleUrls: ["./activity-details.component.scss"]
})
export class ActivityDetailsComponent implements OnInit {
  @Input() public id!: string;
  @Input() public activity!: PostExtended | PlannedPostExtended;
  @Input() public type!: PostType;

  @Output() public exitDetailsClick = new EventEmitter<void>();

  public readonly numberFormat = ".2-2";
  public readonly elevationColorScheme = { domain: [PlotColors.elevation] } as Color;
  public readonly speedColorScheme = { domain: [PlotColors.speed] } as Color;
  public readonly combinedColorScheme = { domain: this.elevationColorScheme.domain.concat(this.speedColorScheme.domain) } as Color;

  public speedPlotData: PlotData[] = [];
  public elevationPlotData: PlotData[] = [];
  public combinedPlotData: PlotData[] = [];
  public maxSpeed?: number;
  public minSpeed?: number;
  public avgSpeed?: number;
  public lowestPoint!: number;
  public highestPoint!: number;

  constructor(
    private readonly layoutService: LayoutService,
    private readonly activitiesService: ActivitiesService,
    private readonly plotDataAdapter: PlotDataAdapterService
  ) {
  }

  public ngOnInit(): void {
    this.parsePlotData();
  }

  public get isMobileLayout(): boolean {
    return this.layoutService.layoutType === LayoutType.ASIDE_MOBILE;
  }

  public get speedProvided(): boolean {
    return this.speedPlotData[0].series.length > 0;
  }

  public get yScaleMinCompound(): number {
    return Math.min(this.lowestPoint ?? 0, this.minSpeed ?? 0);
  }

  public getRouteData(activity: PostExtended | PlannedPostExtended): Route {
    if ("workout" in activity) {
      return activity.workout.route;
    }
    return activity.plannedRoute.route;
  }

  public getStartTimeData(activity: PostExtended | PlannedPostExtended): string {
    if ("workout" in activity) {
      return activity.workout.startTime;
    }
    return "";
  }

  public getEndTimeData(activity: PostExtended | PlannedPostExtended): string {
    if ("workout" in activity) {
      return activity.workout.endTime;
    }
    return "";
  }

  public getAvgSpeedData(activity: PostExtended | PlannedPostExtended): number {
    if ("workout" in activity) {
      return activity.workout.averageSpeed;
    }
    return 0;
  }

  private parsePlotData(): void {
    const route = this.getRoute();
    const plots = this.plotDataAdapter.adapt(route);

    this.speedPlotData = [plots.speed];
    this.elevationPlotData = [plots.elevation];
    this.combinedPlotData = this.elevationPlotData.concat(this.speedPlotData);

    if (this.speedProvided) {
      const speedValues = plots.speed.series.map(data => data.value);
      this.maxSpeed = Math.max(...speedValues);
      this.minSpeed = Math.min(...speedValues);
      const speedSum = speedValues.reduce((acc, current) => acc + current, 0);
      this.avgSpeed = speedSum / plots.elevation.series.length;
    }

    const elevationValues = plots.elevation.series.map(data => data.value);
    this.highestPoint = Math.max(...elevationValues);
    this.lowestPoint = Math.min(...elevationValues);
  }

  private getRoute(): Route {
    if ("workout" in this.activity) {
      return this.activity.workout.route;
    } else {
      return this.activity.plannedRoute.route;
    }
  }
}
