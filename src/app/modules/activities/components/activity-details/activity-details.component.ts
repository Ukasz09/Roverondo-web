import { Component, Input, OnInit } from "@angular/core";
import { ActivitiesService, LayoutService } from "@app/core/services";
import { LayoutType } from "@app/core/enums";
import { ActivityPost, ActivityPostDetails, PlotData } from "@app/core/models";

@Component({
  selector: "app-activity-details",
  templateUrl: "./activity-details.component.html",
  styleUrls: ["./activity-details.component.scss"]
})
export class ActivityDetailsComponent implements OnInit {
  @Input() public id!: string;
  @Input() public activity!: ActivityPost;

  public activityDetails?: ActivityPostDetails;

  constructor(private readonly layoutService: LayoutService, private readonly activitiesService: ActivitiesService) {
  }

  public ngOnInit(): void {
    this.activitiesService.getActivityDetails(this.activity.id).subscribe({
      next: (data) => this.activityDetails = data
    });
  }

  public get isMobileLayout(): boolean {
    return this.layoutService.layoutType === LayoutType.ASIDE_MOBILE;
  }

  public getSpeedPlotData(): PlotData[] {
    return this.activityDetails ? [this.activityDetails.speedPlot] : [];
  }
}
