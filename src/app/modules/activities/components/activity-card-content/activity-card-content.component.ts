import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Utils } from "@app/shared/utils";
import { AppRoutes } from "@app/routes";
import { AuthService } from "@auth0/auth0-angular";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { CommentsSheetComponent } from "../comments-sheet/comments-sheet.component";
import { Point, Post, Route } from "@app/core/models";
import { UserRoutes } from "@app/modules/user";
import { ReactionsSheetComponent } from "../reactions-sheet/reactions-sheet.component";
import { ActivitiesService, CurrentUserService } from "@app/core/services";
import { PostType } from "@app/core/enums";

@Component({
  selector: "app-activity-card-content",
  templateUrl: "./activity-card-content.component.html",
  styleUrls: ["./activity-card-content.component.scss"]
})
export class ActivityCardContentComponent implements OnInit {
  @Input() public activity!: Post;
  @Input() public route!: Route;
  @Input() public disableMapInteractions = true;
  @Input() public startTime?: string;
  @Input() public endTime?: string;
  @Input() public averageSpeed?: number;
  @Input() public type!: PostType;

  @Output() public detailsClick: EventEmitter<void> = new EventEmitter<void>();

  private readonly valueNotFoundPlaceholder = "N/A";
  private currentUserId?: string = undefined;

  constructor(
    private readonly auth: AuthService,
    private readonly _bottomSheet: MatBottomSheet,
    private readonly currentUserService: CurrentUserService,
    private readonly activitiesService: ActivitiesService
  ) {
  }

  public ngOnInit(): void {
    this.auth.user$.subscribe((user) => this.currentUserId = user?.sub);
  }

  public get userProfileLink(): string {
    return `/${AppRoutes.user}/${UserRoutes.profile}/${this.activity.user.id}`;
  }

  public get isLiked(): boolean {
    return this.activity.alreadyReactedTo;
  }

  public openCommentsSheet(withFocus = false): void {
    this._bottomSheet.open(CommentsSheetComponent, {
      hasBackdrop: true,
      data: { post: this.activity, withFocus: withFocus }
    });
  }

  public openReactionsSheet(): void {
    this._bottomSheet.open(ReactionsSheetComponent, {
      hasBackdrop: true,
      data: { postId: this.activity.id }
    });
  }

  public getActivityDurationText(): string {
    if (this.startTime && this.endTime) {
      const activityDuration = this.getActivityDuration();
      return `${activityDuration.hour}h ${activityDuration.minute}min`;
    }
    return this.valueNotFoundPlaceholder;
  }

  public get totalDistanceText(): string {
    const distance = this.route.distance;
    return distance ? `${distance} km` : this.valueNotFoundPlaceholder;
  }

  public get avgSpeedText(): string {
    return this.averageSpeed ? `${this.averageSpeed} km/h` : this.valueNotFoundPlaceholder;
  }

  public get avgElevationText(): string {
    const elevation = this.route.elevation;
    return elevation ? `${elevation} m` : this.valueNotFoundPlaceholder;
  }

  public get routes(): Point[] {
    return this.route.route;
  }

  public onLikeClick(): void {
    this.currentUserService.currentUser$.subscribe({
      next: user => {
        if (user) {
          this.activitiesService.likeActivity$(user.id, this.activity.id).subscribe({
            next: () => {
              this.activity.alreadyReactedTo = true;
              this.activity.reactionsCount++;
            }
          });
        } else {
          console.error("Current user not found - not liked");
        }
      }
    });
  }

  public get withAvgSpeed(): boolean {
    return this.type === PostType.activityPost;
  }

  public get withTime(): boolean {
    return this.type === PostType.activityPost;
  }

  private getActivityDuration(): { hour: number; minute: number } {
    if (this.startTime && this.endTime) {
      const startDate = new Date(Date.parse(this.startTime));
      const endDate = new Date(Date.parse(this.endTime));
      return Utils.calcDeltaTime(startDate, endDate);
    }
    return { hour: 0, minute: 0 };
  }
}
