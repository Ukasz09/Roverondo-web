import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Utils } from "@app/shared/utils";
import { AppRoutes } from "@app/routes";
import { AuthService } from "@auth0/auth0-angular";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { CommentsSheetComponent } from "../comments-sheet/comments-sheet.component";
import { Point, PostExtended } from "@app/core/models";
import { UserRoutes } from "@app/modules/user";

@Component({
  selector: "app-activity-card-content",
  templateUrl: "./activity-card-content.component.html",
  styleUrls: ["./activity-card-content.component.scss"]
})
export class ActivityCardContentComponent implements OnInit {
  @Input() public activity!: PostExtended;
  @Input() public disableMapInteractions = true;

  @Output() public detailsClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() public like: EventEmitter<void> = new EventEmitter<void>();

  private readonly valueNotFoundPlaceholder = "N/A";
  private currentUserId?: string = undefined;

  constructor(private readonly auth: AuthService,
              private readonly _bottomSheet: MatBottomSheet) {
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
      data: { postId: this.activity.id, withFocus: withFocus }
    });
  }

  public getActivityDurationText(): string {
    if (this.activity.workout.startTime && this.activity.workout.endTime) {
      const activityDuration = this.getActivityDuration();
      return `${activityDuration.hour}h ${activityDuration.minute}min`;
    }
    return this.valueNotFoundPlaceholder;
  }

  public get totalDistanceText(): string {
    const distance = this.activity.workout.route.distance;
    return distance ? `${distance} km` : this.valueNotFoundPlaceholder;
  }

  public get avgSpeedText(): string {
    const avgSpeed = this.activity.workout.averageSpeed;
    return avgSpeed ? `${avgSpeed} km/h` : this.valueNotFoundPlaceholder;
  }

  public get avgElevationText(): string {
    const elevation = this.activity.workout.route.elevation;
    return elevation ? `${elevation} m` : this.valueNotFoundPlaceholder;
  }

  public get routes(): Point[] {
    return this.activity.workout.route.route;
  }

  private getActivityDuration(): { hour: number; minute: number } {
    const startDate = new Date(Date.parse(this.activity.workout.startTime));
    const endDate = new Date(Date.parse(this.activity.workout.endTime));
    return Utils.calcDeltaTime(startDate, endDate);
  }
}
