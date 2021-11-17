import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { WallPostsService, LayoutService, PlotDataAdapterService } from "@app/core/services";
import { LayoutType, PlotColors, PostType } from "@app/core/enums";
import { ActivityType, AreaPlotData, Route } from "@app/core/models";
import { Color } from "@swimlane/ngx-charts";
import { SpeedUnitPipe } from "@app/shared/pipes";

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
  public maxSpeed?: number;
  public minSpeed?: number;
  public avgSpeed?: number;
  public lowestPoint!: number;
  public highestPoint!: number;
  public maxPressure!: number;
  public minPressure!: number;

  constructor(
    private readonly layoutService: LayoutService,
    private readonly activitiesService: WallPostsService,
    private readonly plotDataAdapter: PlotDataAdapterService,
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

  public get yScaleMinCompound(): number {
    return Math.min(this.lowestPoint ?? 0, this.minSpeed ?? 0);
  }

  private parsePlotData(): void {
    const route = this.getRoute();
    const plots = this.plotDataAdapter.adapt(route);

    this.elevationPlotData = [plots.elevation];
    if (plots.speed) {
      this.speedPlotData = [plots.speed];
      const speedValues = plots.speed.series.map(data => data.value);
      this.maxSpeed = Math.max(...speedValues);
      this.minSpeed = Math.min(...speedValues);
      const speedSum = speedValues.reduce((acc, current) => acc + current, 0);
      this.avgSpeed = speedSum / plots.elevation.series.length;
    }
    if (plots.pressure) {
      this.pressurePlotData = [plots.pressure];
      const pressureValues = plots.pressure.series.map(data => data.value);
      this.maxPressure = Math.max(...pressureValues);
      this.minPressure = Math.min(...pressureValues);
    }
    this.combinedPlotData = this.elevationPlotData.concat(this.speedPlotData);

    const elevationValues = plots.elevation.series.map(data => data.value);
    this.highestPoint = Math.max(...elevationValues);
    this.lowestPoint = Math.min(...elevationValues);
  }

  private getRoute(): Route {
    if ("workout" in this.activity) {
      return this.activity.workout.route;
    }
    if ("plannedRoute" in this.activity) {
      return this.activity.plannedRoute.route;
    }
    return this.activity.eventRoute.route;
  }
}
