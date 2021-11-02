import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivityPost } from "@app/core/models";
import { Utils } from "@app/shared/utils";
import { AppRoutes } from "@app/routes";
import { AuthService } from "@auth0/auth0-angular";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { CommentsSheetComponent } from "../comments-sheet/comments-sheet.component";

@Component({
  selector: "app-activity-card-content",
  templateUrl: "./activity-card-content.component.html",
  styleUrls: ["./activity-card-content.component.scss"]
})
export class ActivityCardContentComponent implements OnInit {
  @Input() public activity!: ActivityPost;
  @Input() public disableMapInteractions = true;

  @Output() public detailsClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() public like: EventEmitter<void> = new EventEmitter<void>();
  @Output() public comment: EventEmitter<string> = new EventEmitter<string>();

  private currentUserId?: string = undefined;

  constructor(private readonly auth: AuthService,
              private readonly _bottomSheet: MatBottomSheet) {
  }

  public ngOnInit(): void {
    this.auth.user$.subscribe((user) => this.currentUserId = user?.sub);
  }

  public getActivityDuration(): { hour: number; minute: number } {
    const startDate = new Date(Date.parse(this.activity.workout.startTime));
    const endDate = new Date(Date.parse(this.activity.workout.endTime));
    return Utils.calcDeltaTime(startDate, endDate);
  }

  public get userProfileLink(): string {
    return `${AppRoutes.user}/${this.activity.user.id}`;
  }

  public get isLiked(): boolean {
    return !!this.activity.reactions.find(r => r.userId === this.currentUserId);
  }


  public openCommentsSheet(): void {
    this._bottomSheet.open(CommentsSheetComponent, { hasBackdrop: true, data: { postId: this.activity.id } });
  }
}
