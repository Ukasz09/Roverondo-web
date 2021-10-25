import { Component, OnInit } from "@angular/core";
import { ActivitiesService, CurrentUserService, LayoutService } from "@app/core/services";
import { LayoutType } from "@app/core/enums";
import { AppRoutes } from "@app/routes";
import { ActivatedRoute, Data } from "@angular/router";
import { ActivityPost } from "@app/core/models";

@Component({
  selector: "app-activities-wall",
  templateUrl: "./activities-wall.component.html",
  styleUrls: ["./activities-wall.component.scss"]
})
export class ActivitiesWallComponent implements OnInit {
  public readonly AppRoutes = AppRoutes;
  public activities: ActivityPost[] = [];

  constructor(private readonly layoutService: LayoutService, private readonly activatedRoute: ActivatedRoute, private readonly activitiesService: ActivitiesService) {
  }

  public get isMobileLayout(): boolean {
    return this.layoutService.layoutType === LayoutType.ASIDE_MOBILE;
  }

  public ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: (data: Data) => {
        this.activities = data.activities as ActivityPost[];
      }
    });
  }

  public onLikeClick(activity: ActivityPost): void {
    this.activitiesService.likeActivity(activity.id).subscribe({
      next: updatedActivity => {
        const activityIndex = this.activities.indexOf(activity);
        this.activities[activityIndex] = updatedActivity;
      }
    });
  }

  public onAddCommentClick(activity: ActivityPost, comment: string): void {
    console.log("Comment = " + comment);
  }

  public onActivityDetailsClick(activity: ActivityPost): void {
    console.log(`Need to show activity details for activity with id: ${activity.id}`);
  }
}
