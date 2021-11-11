import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { ScrollContainerComponent } from "@app/shared/components";
import { ActivityType, Route } from "@app/core/models";
import { CurrentUserService, LayoutService, ScrollService } from "@app/core/services";
import { AppRoutes, LayoutType, PostType } from "@app/core/enums";

@Component({
  selector: "app-activities-list",
  templateUrl: "./activities-list.component.html",
  styleUrls: ["./activities-list.component.scss"]
})
export class ActivitiesListComponent implements OnInit, AfterViewInit {
  @ViewChild("scrollContainerComponent") public scrollContainerComponent!: ScrollContainerComponent;

  @Input() public activities: ActivityType[] = [];
  @Input() public scrollContainerId!: string;
  @Input() public postType!: PostType;

  @Output() public activityDetailsClick = new EventEmitter<ActivityType>();

  constructor(
    private readonly layoutService: LayoutService,
    public readonly scrollService: ScrollService,
    public readonly currentUserService: CurrentUserService
  ) {
  }

  public get isMobileLayout(): boolean {
    return this.layoutService.layoutType === LayoutType.ASIDE_MOBILE;
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit() {
    this.scrollContainerComponent.scrollTop(this.scrollService.getScrollTopPosition(this.scrollContainerId));
  }

  public get homeRouterLink(): string {
    return `/${AppRoutes.home}`;
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
}
