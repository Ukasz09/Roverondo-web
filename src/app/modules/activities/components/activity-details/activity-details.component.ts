import { Component, Input, OnInit } from "@angular/core";
import { ActivitiesService, LayoutService } from "@app/core/services";
import { LayoutType } from "@app/core/enums";
import { ActivityPost } from "@app/core/models";

@Component({
  selector: "app-activity-details",
  templateUrl: "./activity-details.component.html",
  styleUrls: ["./activity-details.component.scss"]
})
export class ActivityDetailsComponent implements OnInit {
  @Input() id!: string;
  @Input() activity!: ActivityPost;

  constructor(private readonly layoutService: LayoutService, private readonly activitiesService: ActivitiesService) {
  }

  public ngOnInit(): void {
  }

  public get isMobileLayout(): boolean {
    return this.layoutService.layoutType === LayoutType.ASIDE_MOBILE;
  }
}
