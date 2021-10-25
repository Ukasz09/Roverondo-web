import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivityPost, PostReaction } from "@app/core/models";
import { Utils } from "@app/shared/utils";
import { AppRoutes } from "@app/routes";
import { ActivitiesService, CurrentUserService } from "@app/core/services";

@Component({
  selector: "app-activity-card-content",
  templateUrl: "./activity-card-content.component.html",
  styleUrls: ["./activity-card-content.component.scss"]
})
export class ActivityCardContentComponent implements OnInit {
  @Input() public activity!: ActivityPost;

  @Output() public detailsClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() public like: EventEmitter<void> = new EventEmitter<void>();
  @Output() public comment: EventEmitter<string> = new EventEmitter<string>();

  constructor(private readonly currentUserService: CurrentUserService) {
  }

  public ngOnInit(): void {
  }

  public getActivityDuration(): { hour: number; minute: number } {
    const startDate = new Date(Date.parse(this.activity.workout.startTime));
    const endDate = new Date(Date.parse(this.activity.workout.endTime));
    return Utils.calcDeltaTime(startDate, endDate);
  }

  public get userProfileLink(): string {
    return `${AppRoutes.userProfile}/${this.activity.user.id}`;
  }

  public get isLiked(): boolean {
    const currentUserId = this.currentUserService.currentUser?.id;
    if (currentUserId) {
      return !!this.activity.reactions.find(r => r.userId === currentUserId);
    }
    return false;
  }
}
