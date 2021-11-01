import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivitiesService, LayoutService } from "@app/core/services";
import { LayoutType } from "@app/core/enums";
import { ActivityPost, PlotData } from "@app/core/models";

@Component({
  selector: "app-activity-details",
  templateUrl: "./activity-details.component.html",
  styleUrls: ["./activity-details.component.scss"]
})
export class ActivityDetailsComponent implements OnInit {
  @Input() public id!: string;
  @Input() public activity!: ActivityPost;

  @Output() public exitDetailsClick = new EventEmitter<void>();

  public speedPlotData?: PlotData[];
  public elevationPlotData?: PlotData[];
  public combinedPlotData?: PlotData[];
  public maxSpeed?: number;
  public avgSpeed?: number;
  public lowestPoint?: number;
  public highestPoint?: number;
  public numberFormat = ".2-2";

  constructor(
    private readonly layoutService: LayoutService,
    private readonly activitiesService: ActivitiesService) {
  }

  public ngOnInit(): void {
    this.activitiesService.getActivityDetails(this.activity.id).subscribe({
      next: (activityDetails) => {
        this.speedPlotData = [activityDetails.speedPlot];
        this.elevationPlotData = [activityDetails.elevationPlot];
        this.combinedPlotData = this.speedPlotData.concat(this.elevationPlotData);
        const speedValues = activityDetails.speedPlot.series.map(data => data.value);
        const elevationValues = activityDetails.elevationPlot.series.map(data => data.value);
        this.maxSpeed = Math.max(...speedValues);
        this.highestPoint = Math.max(...elevationValues);
        this.lowestPoint = Math.min(...elevationValues);
        const speedSum = speedValues.reduce((acc, current) => acc + current, 0);
        this.avgSpeed = speedSum / activityDetails.elevationPlot.series.length;
      }
    });
  }

  public get isMobileLayout(): boolean {
    return this.layoutService.layoutType === LayoutType.ASIDE_MOBILE;
  }
}
