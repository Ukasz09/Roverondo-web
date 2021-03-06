import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { LayoutService, ScrollService, WallPostsService } from "@app/core/services";
import { ActivitiesRoutes, PostType, SpinnerType } from "@app/core/enums";
import { ActivatedRoute } from "@angular/router";
import { ScrollContainerComponent } from "@app/shared/components";
import { PostsResolver, WallResolver } from "../../services";
import { ActivityType, User } from "@app/core/models";
import { combineLatest, Observable, Subscription, throwError } from "rxjs";
import { Utils } from "@app/shared/utils";
import { NgxSpinnerService } from "ngx-spinner";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { FilterSheetComponent } from "../../components";

@Component({
  selector: "app-activities-page",
  templateUrl: "./activities-page.component.html",
  styleUrls: ["./activities-page.component.scss"]
})
export class ActivitiesPageComponent implements OnInit, OnDestroy {
  @ViewChild("scrollContainerComponent") scrollContainerComponent?: ScrollContainerComponent;

  public scrollContainerId = "activities-wall";
  public activities: ActivityType[] = [];
  public user!: User;
  public selectedActivity?: ActivityType;
  public wallView = false;

  private readonly loadMoreDataScrollOffsetPx = 700;
  private loadingMoreActivities = false;
  private noMoreActivities = false;
  private type!: ActivitiesRoutes;
  private scrollBottomSubscription$?: Subscription;
  private offsetOrPage = 0;

  constructor(
    private readonly layoutService: LayoutService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly activitiesService: WallPostsService,
    private readonly postsResolver: PostsResolver,
    private readonly wallResolver: WallResolver,
    public readonly scrollService: ScrollService,
    private readonly spinner: NgxSpinnerService,
    private readonly _bottomSheet: MatBottomSheet
  ) {
  }

  public ngOnInit(): void {
    combineLatest([
      this.activatedRoute.params,
      this.activatedRoute.data,
      this.activatedRoute.url
    ]).subscribe(([params, data, url]) => {
      this.type = params.type;
      this.scrollContainerId = Utils.getScrollContainerId(this.type);
      this.activities = data.activities;
      this.user = data.user;
      this.noMoreActivities = false;
      this.loadingMoreActivities = false;
      this.selectedActivity = undefined;
      this.wallView = !!url.find(urlSegment => urlSegment.path === ActivitiesRoutes.wall);
      this.spinner.hide(SpinnerType.main).then();
    });

    this.scrollBottomSubscription$ = this.scrollService.scrollBottomChange$.subscribe((event) => {
      if (this.needToLoadMoreActivities(event.id, event.position)) {
        this.loadMoreActivities();
      }
    });
  }

  public ngOnDestroy(): void {
    this.scrollBottomSubscription$?.unsubscribe();
  }

  public onActivityDetailsClick(activity: ActivityType): void {
    this.selectedActivity = activity;
  }

  public exitDetailsView(): void {
    this.selectedActivity = undefined;
  }

  public postType(post?: ActivityType): PostType | undefined {
    switch (this.type) {
      case ActivitiesRoutes.planned:
        return PostType.plannedRoutePost;
      case ActivitiesRoutes.events:
        return PostType.eventPost;
    }
    if (post) {
      if ("workout" in post) {
        return PostType.activityPost;
      }
      if ("plannedRoute" in post) {
        return PostType.plannedRoutePost;
      }
      return PostType.eventPost;
    }
    return undefined;
  }

  public get headerText(): string {
    const wallSuffixText = this.wallView ? "wall" : "";
    switch (this.type) {
      case ActivitiesRoutes.completed:
        return `Activities ${wallSuffixText}`;
      case ActivitiesRoutes.events:
        return `Events ${wallSuffixText}`;
      case ActivitiesRoutes.planned:
        return `Planned routes ${wallSuffixText}`;
      case ActivitiesRoutes.liked:
        return "Liked activities";
      default:
        return "Wall";
    }
  }

  public openFilterSheet(): void {
    this._bottomSheet.open(FilterSheetComponent, {
      hasBackdrop: true,
      data: { activatedRouteType: this.type }
    });
  }

  private needToLoadMoreActivities(id: string, bottomPosition: number): boolean {
    return id === this.scrollContainerId &&
      bottomPosition < this.loadMoreDataScrollOffsetPx &&
      !this.loadingMoreActivities &&
      !this.noMoreActivities;
  }

  private loadMoreActivities(): void {
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
    if (this.user) {
      this.updatePageOrOffset();
      if (this.wallView) {
        return this.wallResolver.getActivities$(this.user.id, this.offsetOrPage, this.type);
      }
      return this.postsResolver.getActivities$(this.user.id, this.offsetOrPage, this.type);
    } else {
      return throwError("User not found - data not fetched");
    }
  }

  private updatePageOrOffset(): void {
    const isOffsetType = this.wallView;
    if (isOffsetType) {
      this.offsetOrPage = this.activities.length;
    } else {
      this.offsetOrPage++;
    }
  }
}
