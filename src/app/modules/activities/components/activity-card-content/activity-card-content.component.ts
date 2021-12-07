import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Utils } from "@app/shared/utils";
import { AuthService } from "@auth0/auth0-angular";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { CommentsSheetComponent } from "../comments-sheet/comments-sheet.component";
import { ActivityType, EventPostExtended, Point, Route } from "@app/core/models";
import { ReactionsSheetComponent } from "../reactions-sheet/reactions-sheet.component";
import { CurrentUserService, EventsService, PostsService, SnackbarInfoService } from "@app/core/services";
import { AppRoutes, PostType, UserRoutes } from "@app/core/enums";
import { switchMap } from "rxjs/operators";
import { throwError } from "rxjs";
import { LengthUnitPipe, SpeedUnitPipe } from "@app/shared/pipes";
import { DatePipe, DecimalPipe } from "@angular/common";
import { EventParticipantsSheetComponent } from "../event-participants-sheet/event-participants-sheet.component";

@Component({
  selector: "app-activity-card-content",
  templateUrl: "./activity-card-content.component.html",
  styleUrls: ["./activity-card-content.component.scss"]
})
export class ActivityCardContentComponent implements OnInit {
  @Input() public activity!: ActivityType;
  @Input() public type?: PostType;
  @Input() public disableMapInteractions = true;
  @Input() public withStats = true;
  @Input() public withBottomMargin = true;
  @Input() public backBtnVisible = false;

  @Output() public detailsClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() public backBtnClick: EventEmitter<void> = new EventEmitter<void>();

  public readonly PostType = PostType;

  private readonly valueNotFoundPlaceholder = "N/A";
  private currentUserId?: string = undefined;

  constructor(
    private readonly auth: AuthService,
    private readonly _bottomSheet: MatBottomSheet,
    private readonly currentUserService: CurrentUserService,
    private readonly postsService: PostsService,
    public readonly msgInfoService: SnackbarInfoService,
    public readonly mToKmPipe: LengthUnitPipe,
    public readonly decimalPipe: DecimalPipe,
    public readonly speedUnitPipe: SpeedUnitPipe,
    private readonly eventsService: EventsService
  ) {
  }

  public ngOnInit(): void {
    this.auth.user$.subscribe((user) => this.currentUserId = user?.sub);
  }

  public get userProfileLink(): string {
    return `/${AppRoutes.user}/${this.activity.user.id}/${UserRoutes.profile}`;
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

  public joinEvent(): void {
    this.currentUserService.currentUser$.pipe(
      switchMap(user => {
        if (user) {
          return this.eventsService.joinToTheEvent$(this.activity.id, user.id);
        }
        return throwError("Not found current user - not joined");
      })
    ).subscribe(() => {
      const eventPostExtended = this.activity as EventPostExtended;
      eventPostExtended.enrolledUsers++;
      eventPostExtended.alreadyJoined = true;
    });
  }

  public leaveEvent(): void {
    this.currentUserService.currentUser$.pipe(
      switchMap(user => {
        if (user) {
          return this.eventsService.leaveEvent$(this.activity.id, user.id);
        }
        return throwError("Not found current user - not left");
      })
    ).subscribe(() => {
      const eventPostExtended = this.activity as EventPostExtended;
      eventPostExtended.enrolledUsers--;
      eventPostExtended.alreadyJoined = false;
    });
  }

  public openEventParticipantsSheet(): void {
    this._bottomSheet.open(EventParticipantsSheetComponent, {
      hasBackdrop: true,
      data: { eventId: this.activity.id }
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
    return this.averageSpeed ? `${this.decimalPipe.transform(this.speedUnitPipe.transform(this.averageSpeed), "1.1-1")} km/h` : this.valueNotFoundPlaceholder;
  }

  public get avgElevationText(): string {
    const elevation = this.route.elevation;
    return elevation ? `${this.decimalPipe.transform(elevation, "1.0-0")} m` : this.valueNotFoundPlaceholder;
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

  public get withEventStartTime(): boolean {
    return this.type === PostType.eventPost;
  }

  public get withEventStartDate(): boolean {
    return this.type === PostType.eventPost;
  }

  public get route(): Route {
    if ("workout" in this.activity) {
      return this.activity.workout.route;
    }
    return this.activity.plannedRoute.route;
  }

  public get startTime(): string {
    if ("workout" in this.activity) {
      return this.activity.workout.startTime;
    }
    return "";
  }

  public get endTime(): string {
    if ("workout" in this.activity) {
      return this.activity.workout.endTime;
    }
    return "";
  }

  public get averageSpeed(): number {
    if ("workout" in this.activity) {
      return this.activity.workout.averageSpeed;
    }
    return 0;
  }

  public get postTypeText(): string {
    switch (this.type) {
      case PostType.activityPost: {
        return "went bike riding";
      }
      case PostType.eventPost: {
        return "created an event";
      }
      case PostType.plannedRoutePost: {
        return "planned a route";
      }
    }
    return "created a post"
  }

  public getEventStartDate(format = "shortDate"): string {
    if (this.type == PostType.eventPost) {
      if ("startsAt" in this.activity) {
        const eventStartFullDate = this.activity.startsAt;
        const formattedDate = new DatePipe("en-US").transform(eventStartFullDate, format) ?? this.valueNotFoundPlaceholder;
        return eventStartFullDate ? formattedDate : this.valueNotFoundPlaceholder;
      }
    }
    return this.valueNotFoundPlaceholder;
  }

  public get eventStartTime(): string {
    return this.getEventStartDate("shortTime");
  }

  public get activityAsEventPostExtended(): EventPostExtended {
    return this.activity as EventPostExtended;
  }

  private addReactionToActivity(): void {
    this.currentUserService.currentUser$.pipe(
      switchMap(user => {
        return user ?
          this.postsService.addReactionToActivity$(user.id, this.activity.id) :
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
          this.postsService.removeReactionFromActivity$(user.id, this.activity.id) :
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
