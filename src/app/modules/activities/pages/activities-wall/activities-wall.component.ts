import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivitiesService, CurrentUserService, LayoutService, ScrollService } from "@app/core/services";
import { LayoutType, PostType } from "@app/core/enums";
import { AppRoutes } from "@app/routes";
import { ActivatedRoute, Data } from "@angular/router";
import { ScrollContainerComponent } from "@app/shared/components";
import { ActivitiesResolver } from "../../services";
import { PlannedPostExtended, PostExtended, Route } from "@app/core/models";
import { ActivitiesRoutes } from "@app/routes/activities";

@Component({
  selector: "app-activities-wall",
  templateUrl: "./activities-wall.component.html",
  styleUrls: ["./activities-wall.component.scss"]
})
export class ActivitiesWallComponent implements OnInit {
  @ViewChild("scrollContainerComponent") scrollContainerComponent?: ScrollContainerComponent;

  public readonly AppRoutes = AppRoutes;
  public scrollContainerId = "activities-wall";
  public activities: (PostExtended | PlannedPostExtended)[] = [];
  public selectedActivity?: PostExtended | PlannedPostExtended;

  private loadingMoreActivities = false;
  private noMoreActivities = false;
  private type = "";

  constructor(
    private readonly layoutService: LayoutService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly activitiesService: ActivitiesService,
    private readonly activitiesResolver: ActivitiesResolver,
    public readonly scrollService: ScrollService,
    public readonly currentUserService: CurrentUserService
  ) {
  }

  public get isMobileLayout(): boolean {
    return this.layoutService.layoutType === LayoutType.ASIDE_MOBILE;
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.type = params.type;
      this.scrollContainerId = `${this.type}-activities-wall`;
      if (this.scrollContainerComponent) {
        this.scrollContainerComponent.scrollTop(this.scrollService.getScrollTopPosition(this.scrollContainerId));
      } else {
        console.warn("Scroll container not exist - not scrolled");
      }
    });

    this.activatedRoute.data.subscribe({
      next: (data: Data) => {
        this.activities = data.activities as PostExtended[] | PlannedPostExtended[];
        this.noMoreActivities = false;
        this.loadingMoreActivities = false;
        this.selectedActivity = undefined;
      }
    });

    this.scrollService.scrollBottomChange$.subscribe((event) => {
      if (this.needToLoadMoreActivities(event.id, event.position)) {
        this.loadMoreActivities();
      }
    });
  }

  public onActivityDetailsClick(activity: PostExtended | PlannedPostExtended): void {
    this.selectedActivity = activity;
  }

  public exitDetailsView(): void {
    this.selectedActivity = undefined;
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

  public get postType(): PostType {
    if (this.type === ActivitiesRoutes.plannedActivities) {
      return PostType.plannedRoutePost;
    }
    return PostType.activityPost;
  }

  private needToLoadMoreActivities(id: string, bottomPosition: number): boolean {
    // TODO: tmp fixed offset - change
    return id === this.scrollContainerId && bottomPosition < 700 && !this.loadingMoreActivities && !this.noMoreActivities;
  }

  private loadMoreActivities(): void {
    console.log("Loading more activities");
    this.loadingMoreActivities = true;
    this.currentUserService.currentUser$.subscribe({
      next: (user) => {
        if (user) {
          this.activitiesResolver.getActivities$(user.id, this.activities.length, this.type).subscribe({
            next: data => {
              if (data.length === 0) {
                this.noMoreActivities = true;
              }
              this.activities = this.activities.concat(data);
              this.loadingMoreActivities = false;
            }
          });
        } else {
          console.error("User not found - data not fetched");
        }
      }
    });
  }
}
