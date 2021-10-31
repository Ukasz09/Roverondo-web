import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivitiesService, LayoutService, ScrollService } from "@app/core/services";
import { LayoutType } from "@app/core/enums";
import { AppRoutes } from "@app/routes";
import { ActivatedRoute, Data } from "@angular/router";
import { ActivityPost, PostReaction } from "@app/core/models";
import { ScrollContainerComponent } from "@app/shared/components";
import { ActivitiesResolver } from "../../services";

@Component({
  selector: "app-activities-wall",
  templateUrl: "./activities-wall.component.html",
  styleUrls: ["./activities-wall.component.scss"]
})
export class ActivitiesWallComponent implements OnInit {
  @ViewChild("scrollContainerComponent") scrollContainerComponent?: ScrollContainerComponent;

  public readonly AppRoutes = AppRoutes;
  public scrollContainerId = "activities-wall";
  public activities: ActivityPost[] = [];
  public selectedActivity?: ActivityPost;

  private loadingMoreActivities = false;
  private type = "";

  constructor(
    private readonly layoutService: LayoutService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly activitiesService: ActivitiesService,
    private readonly activitiesResolver: ActivitiesResolver,
    public readonly scrollService: ScrollService
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
        this.activities = data.activities as ActivityPost[];
      }
    });

    this.scrollService.scrollBottomChange$.subscribe((event) => {
      if (this.needToLoadMoreActivities(event.id, event.position)) {
        this.loadMoreActivities();
      }
    });
  }

  public onLikeClick(activity: ActivityPost): void {
    this.activitiesService.likeActivity$(activity.id).subscribe({
      next: () => {
        activity.reactions.push({ userId: "1", emoji: "", addedAt: "" } as PostReaction);
      }
    });
  }

  public onAddCommentClick(activity: ActivityPost, comment: string): void {
    console.log("Comment = " + comment);
  }

  public onActivityDetailsClick(activity: ActivityPost): void {
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
    this.loadingMoreActivities = true;
    this.activitiesResolver.getActivities$(this.activities.length, this.type).subscribe({
      next: data => {
        this.activities = this.activities.concat(data);
        this.loadingMoreActivities = false;
      }
    });
    console.log("Loading more activities");
  }
}
