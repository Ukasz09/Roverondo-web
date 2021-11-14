import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { CurrentUserService, LayoutService, ScrollService, WallPostsService } from "@app/core/services";
import { ActivitiesRoutes, AppRoutes, PostType, SpinnerType } from "@app/core/enums";
import { ActivatedRoute } from "@angular/router";
import { ScrollContainerComponent } from "@app/shared/components";
import { ActivitiesResolver } from "../../services";
import { ActivityType, User } from "@app/core/models";
import { switchMap } from "rxjs/operators";
import { combineLatest, Observable, Subscription, throwError } from "rxjs";
import { Utils } from "@app/shared/utils";
import { NgxSpinnerService } from "ngx-spinner";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { FilterSheetComponent } from "../../components";

@Component({
  selector: "app-activities-wall",
  templateUrl: "./activities-wall.component.html",
  styleUrls: ["./activities-wall.component.scss"]
})
export class ActivitiesWallComponent implements OnInit, OnDestroy {
  @ViewChild("scrollContainerComponent") scrollContainerComponent?: ScrollContainerComponent;

  public scrollContainerId = "activities-wall";
  public activities: ActivityType[] = [];
  public user!: User;
  public wallReady = false;
  public selectedActivity?: ActivityType;

  private readonly loadMoreDataScrollOffsetPx = 700;
  private loadingMoreActivities = false;
  private noMoreActivities = false;
  private type = "";
  private scrollBottomSubscription$?: Subscription;

  constructor(
    private readonly layoutService: LayoutService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly activitiesService: WallPostsService,
    private readonly activitiesResolver: ActivitiesResolver,
    public readonly scrollService: ScrollService,
    public readonly currentUserService: CurrentUserService,
    private readonly spinner: NgxSpinnerService,
    private readonly _bottomSheet: MatBottomSheet
  ) {
  }

  public ngOnInit(): void {
    combineLatest([
      this.activatedRoute.params,
      this.activatedRoute.data
    ]).subscribe(([params, data]) => {
      this.type = params.type;
      this.scrollContainerId = Utils.getScrollContainerId(this.type);
      this.activities = data.activities;
      this.user = data.user;
      this.noMoreActivities = false;
      this.loadingMoreActivities = false;
      this.selectedActivity = undefined;
      this.wallReady = true;
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

  public get postType(): PostType {
    switch (this.type) {
      case ActivitiesRoutes.plannedActivities:
        return PostType.plannedRoutePost;
      case ActivitiesRoutes.eventsActivities:
        return PostType.eventPost;
      default:
        return PostType.activityPost;
    }
  }

  public get headerText(): string {
    switch (this.type) {
      case ActivitiesRoutes.eventsActivities:
        return "Events Wall";
      case ActivitiesRoutes.plannedActivities:
        return "Planned routes";
      case ActivitiesRoutes.likedActivities:
        return "Liked activities";
      case ActivitiesRoutes.myActivities:
        return "Activities";
      default:
        return "Activities Wall";
    }
  }

  public openFilterSheet(): void {
    this._bottomSheet.open(FilterSheetComponent, {
      hasBackdrop: true
    });
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
