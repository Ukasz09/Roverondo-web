import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivitiesService, CurrentUserService, LayoutService, ScrollService } from "@app/core/services";
import { ActivitiesRoutes, AppRoutes, LayoutType, PostType } from "@app/core/enums";
import { ActivatedRoute, Data } from "@angular/router";
import { ScrollContainerComponent } from "@app/shared/components";
import { ActivitiesResolver } from "../../services";
import { ActivityType, Route } from "@app/core/models";
import { switchMap } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

@Component({
  selector: "app-activities-wall",
  templateUrl: "./activities-wall.component.html",
  styleUrls: ["./activities-wall.component.scss"]
})
export class ActivitiesWallComponent implements OnInit {
  @ViewChild("scrollContainerComponent") scrollContainerComponent?: ScrollContainerComponent;

  public readonly AppRoutes = AppRoutes;
  public scrollContainerId = "activities-wall";
  public activities: ActivityType[] = [];
  public selectedActivity?: ActivityType;

  private readonly loadMoreDataScrollOffsetPx = 700;
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
        this.activities = data.activities;
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

  public onActivityDetailsClick(activity: ActivityType): void {
    this.selectedActivity = activity;
  }

  public exitDetailsView(): void {
    this.selectedActivity = undefined;
  }

  public getRouteData(activity: ActivityType): Route {
    if ("workout" in activity) {
      return activity.workout.route;
    }
    if ("plannedRoute" in activity) {
      return activity.plannedRoute.route;
    }
    return activity.eventRoute.route;
  }

  public getStartTimeData(activity: ActivityType): string {
    if ("workout" in activity) {
      return activity.workout.startTime;
    }
    return "";
  }

  public getEndTimeData(activity: ActivityType): string {
    if ("workout" in activity) {
      return activity.workout.endTime;
    }
    return "";
  }

  public getAvgSpeedData(activity: ActivityType): number {
    if ("workout" in activity) {
      return activity.workout.averageSpeed;
    }
    return 0;
  }

  public getEventDurationTime(activity: ActivityType): string {
    if ("eventRoute" in activity) {
      return activity.eventRoute.eventDurationTime;
    }
    return "";
  }

  public getEventStartDate(activity: ActivityType) {
    if ("eventRoute" in activity) {
      return activity.eventRoute.eventStartDate;
    }
    return "";
  }

  public get postType(): PostType {
    if (this.type === ActivitiesRoutes.plannedActivities) {
      return PostType.plannedRoutePost;
    }
    if (this.type === ActivitiesRoutes.eventsActivities) {
      return PostType.eventPost;
    }
    return PostType.activityPost;
  }

  private needToLoadMoreActivities(id: string, bottomPosition: number): boolean {
    return id === this.scrollContainerId &&
      bottomPosition < this.loadMoreDataScrollOffsetPx &&
      !this.loadingMoreActivities &&
      !this.noMoreActivities;
  }

  private loadMoreActivities(): void {
    console.log("Loading more activities");
    this.loadingMoreActivities = true;

    this.getMoreActivitiesData$().subscribe(data => {
      if (data.length === 0) {
        this.noMoreActivities = true;
      }
      this.activities = this.activities.concat(data);
      this.loadingMoreActivities = false;
    });
  }

  private getMoreActivitiesData$(): Observable<ActivityType[]> {
    return this.currentUserService.currentUser$.pipe(
      switchMap((user) => {
        if (user) {
          return this.activitiesResolver.getActivities$(user.id, this.activities.length, this.type);
        }
        return throwError("User not found - data not fetched");
      })
    );
  }
}
