import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivitiesService, CurrentUserService, LayoutService, ScrollService } from "@app/core/services";
import { LayoutType } from "@app/core/enums";
import { AppRoutes } from "@app/routes";
import { ActivatedRoute, Data } from "@angular/router";
import { ScrollContainerComponent } from "@app/shared/components";
import { ActivitiesResolver } from "../../services";
import { PostExtended } from "@app/core/models";

@Component({
  selector: "app-activities-wall",
  templateUrl: "./activities-wall.component.html",
  styleUrls: ["./activities-wall.component.scss"]
})
export class ActivitiesWallComponent implements OnInit {
  @ViewChild("scrollContainerComponent") scrollContainerComponent?: ScrollContainerComponent;

  public readonly AppRoutes = AppRoutes;
  public scrollContainerId = "activities-wall";
  public activities: PostExtended[] = [];
  public selectedActivity?: PostExtended;

  private loadingMoreActivities = false;
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
        this.activities = data.activities as PostExtended[];
      }
    });

    this.scrollService.scrollBottomChange$.subscribe((event) => {
      if (this.needToLoadMoreActivities(event.id, event.position)) {
        this.loadMoreActivities();
      }
    });
  }

  public onLikeClick(activity: PostExtended): void {
    this.currentUserService.currentUser$.subscribe({
      next: user => {
        if (user) {
          this.activitiesService.likeActivity$(user.id, activity.id).subscribe({
            next: () => {
              activity.alreadyReactedTo = true;
            }
          });
        } else {
          console.error("Current user not found - not liked");
        }
      }
    });


  }

  public onAddCommentClick(activity: PostExtended, comment: string): void {
    // TODO:
    console.log("Comment = " + comment);
  }

  public onActivityDetailsClick(activity: PostExtended): void {
    this.selectedActivity = activity;
  }

  public exitDetailsView(): void {
    this.selectedActivity = undefined;
  }

  private needToLoadMoreActivities(id: string, bottomPosition: number): boolean {
    // TODO: tmp fixed offset - change
    return id === this.scrollContainerId && bottomPosition < 700 && !this.loadingMoreActivities;
  }

  private loadMoreActivities(): void {
    console.log("Loading more activities");
    this.loadingMoreActivities = true;
    this.currentUserService.currentUser$.subscribe({
      next: (user) => {
        if (user) {
          this.activitiesResolver.getActivities$(user.id, this.activities.length, this.type).subscribe({
            next: data => {
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
