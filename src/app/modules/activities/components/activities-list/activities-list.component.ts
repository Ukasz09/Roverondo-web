import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { ScrollContainerComponent } from "@app/shared/components";
import { ActivityType, User } from "@app/core/models";
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
  @Input() public postType?: PostType;

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

  public postTypeFromModel(activity: ActivityType): PostType {
    if ("workout" in activity) {
      return PostType.activityPost;
    }
    if ("plannedRoute" in activity) {
      return PostType.plannedRoutePost;
    }
    return PostType.eventPost;
  }
}
