import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Utils } from "@app/shared/utils";
import { AuthService } from "@auth0/auth0-angular";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { CommentsSheetComponent } from "../comments-sheet/comments-sheet.component";
import { Point, Post, Route } from "@app/core/models";
import { ReactionsSheetComponent } from "../reactions-sheet/reactions-sheet.component";
import { ActivitiesService, CurrentUserService, SnackbarInfoService } from "@app/core/services";
import { AppRoutes, PostType, UserRoutes } from "@app/core/enums";
import { switchMap } from "rxjs/operators";
import { throwError } from "rxjs";
import { LengthUnitPipe, SpeedUnitPipe } from "@app/shared/pipes";
import { DecimalPipe } from "@angular/common";

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
  @Input() public eventStartDate?: string;
  @Input() public eventDurationTime?: string;
  @Input() public type!: PostType;

  @Output() public detailsClick: EventEmitter<void> = new EventEmitter<void>();

  private readonly valueNotFoundPlaceholder = "N/A";
  private currentUserId?: string = undefined;

  constructor(
    private readonly auth: AuthService,
    private readonly _bottomSheet: MatBottomSheet,
    private readonly currentUserService: CurrentUserService,
    private readonly activitiesService: ActivitiesService,
    public readonly msgInfoService: SnackbarInfoService,
    public readonly mToKmPipe: LengthUnitPipe,
    public readonly decimalPipe: DecimalPipe,
    public readonly msToKmhPipe: SpeedUnitPipe
  ) {
  }

  public ngOnInit(): void {
    this.auth.user$.subscribe((user) => this.currentUserId = user?.sub);
  }

  public get userProfileLink(): string {
    return `/${AppRoutes.user}/${UserRoutes.profile}/${this.activity.user.id}`;
  }

  public get alreadyReacted(): boolean {
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
    return distance ? `${this.decimalPipe.transform(this.mToKmPipe.transform(distance), "1.2-2")} km` : this.valueNotFoundPlaceholder;
  }

  public get avgSpeedText(): string {
    return this.averageSpeed ? `${this.decimalPipe.transform(this.msToKmhPipe.transform(this.averageSpeed),"1.1-1")} km/h` : this.valueNotFoundPlaceholder;
  }

  public get avgElevationText(): string {
    const elevation = this.route.elevation;
    return elevation ? `${this.decimalPipe.transform(elevation, "1.0-0")} m` : this.valueNotFoundPlaceholder;
  }

  public get eventStartDateText(): string {
    return this.eventStartDate ? `${this.eventStartDate} m` : this.valueNotFoundPlaceholder;
  }

  public get eventDurationTimeText(): string {
    return this.eventDurationTime ? `${this.eventDurationTime} m` : this.valueNotFoundPlaceholder;
  }

  public get routes(): Point[] {
    return this.route.route;
  }

  public onReactionBtnClick(): void {
    this.alreadyReacted ? this.removeReactionFromActivity() : this.addReactionToActivity();
  }

  public get withAvgSpeed(): boolean {
    return this.type === PostType.activityPost;
  }

  public get withTime(): boolean {
    return this.type === PostType.activityPost;
  }

  public get withEventDurationTime(): boolean {
    return this.type === PostType.eventPost;
  }

  public get withEventStartDate(): boolean {
    return this.type === PostType.eventPost;
  }

  private addReactionToActivity(): void {
    this.currentUserService.currentUser$.pipe(
      switchMap(user => {
        return user ?
          this.activitiesService.addReactionToActivity$(user.id, this.activity.id) :
          throwError("Current user not found - reaction not added");
      })
    ).subscribe(() => {
      this.activity.alreadyReactedTo = true;
      this.activity.reactionsCount++;
      this.msgInfoService.openTextSnackbar("Reaction has been added", "OK");
    });
  }

  private removeReactionFromActivity(): void {
    this.currentUserService.currentUser$.pipe(
      switchMap(user => {
        return user ?
          this.activitiesService.removeReactionFromActivity$(user.id, this.activity.id) :
          throwError("Current user not found - reaction not removed");
      })
    ).subscribe(() => {
      this.activity.alreadyReactedTo = false;
      this.activity.reactionsCount--;
      this.msgInfoService.openTextSnackbar("Reaction has been removed", "OK");
    });
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
