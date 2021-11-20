import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { WallPostsService, LayoutService, PlotDataAdapterService } from "@app/core/services";
import { LayoutType, PlotColors, PostType } from "@app/core/enums";
import { ActivityType, AreaPlotData, Route } from "@app/core/models";
import { Color } from "@swimlane/ngx-charts";

@Component({
  selector: "app-activity-details",
  templateUrl: "./activity-details.component.html",
  styleUrls: ["./activity-details.component.scss"]
})
export class ActivityDetailsComponent implements OnInit {
  @Input() public id!: string;
  @Input() public activity!: ActivityType;
  @Input() public type!: PostType;

  @Output() public exitDetailsClick = new EventEmitter<void>();

  public readonly numberFormat = ".2-2";
  public readonly elevationColorScheme = { domain: [PlotColors.elevation] } as Color;
  public readonly speedColorScheme = { domain: [PlotColors.speed] } as Color;
  public readonly pressureColorScheme = { domain: [PlotColors.pressure] } as Color;
  public readonly combinedColorScheme = { domain: this.elevationColorScheme.domain.concat(this.speedColorScheme.domain) } as Color;

  public speedPlotData: AreaPlotData[] = [];
  public elevationPlotData: AreaPlotData[] = [];
  public pressurePlotData: AreaPlotData[] = [];
  public combinedPlotData: AreaPlotData[] = [];
  public maxPressure!: number;
  public minPressure!: number;

  constructor(
    private readonly layoutService: LayoutService,
    private readonly activitiesService: WallPostsService,
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
    if ("plannedRoute" in this.activity) {
      return this.activity.plannedRoute.route;
    }
    return this.activity.eventRoute.route;
  }

  private parsePlotData(): void {
    const route = this.getRoute();
    const plots = this.plotDataAdapter.adapt(route);

    this.elevationPlotData = [plots.elevation];
    if (plots.speed) {
      this.speedPlotData = [plots.speed];
    }
    if (plots.pressure) {
      // TODO: integrate with backend - display only if provided
      this.pressurePlotData = [plots.pressure];
      const pressureValues = plots.pressure.series.map(data => data.value);
      this.maxPressure = Math.max(...pressureValues);
      this.minPressure = Math.min(...pressureValues);
    }
    this.combinedPlotData = this.elevationPlotData.concat(this.speedPlotData);
  }
}
