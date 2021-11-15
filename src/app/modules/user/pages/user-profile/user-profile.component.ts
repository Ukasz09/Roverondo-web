import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { User } from "@app/core/models";
import { ActivitiesRoutes, AppRoutes, SpinnerType, UserRoutes } from "@app/core/enums";
import { NgxSpinnerService } from "ngx-spinner";
import { CurrentUserService } from "@app/core/services";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"]
})
export class UserProfileComponent implements OnInit {
  public user!: User;
  public alreadyFollowed = false;

  constructor(
    public readonly currentUserService: CurrentUserService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly spinner: NgxSpinnerService,
    private readonly router: Router
  ) {
  }

  public ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: Data) => {
      this.user = data.user;
      this.spinner.hide(SpinnerType.main).then();
    });
  }

  public onFollowClick(): void {
    this.alreadyFollowed = !this.alreadyFollowed;
    // TODO: add logic
  }

  public navigateToActivities(): void {
    this.router.navigate([`/${AppRoutes.activities}/${this.user.id}/${ActivitiesRoutes.completed}`]).then();
  }

  public navigateToPlannedRoutes(): void {
    this.router.navigate([`/${AppRoutes.activities}/${this.user.id}/${ActivitiesRoutes.planned}`]).then();
  }

  public navigateToEvents(): void {
    this.router.navigate([`/${AppRoutes.activities}/${this.user.id}/${ActivitiesRoutes.events}`]).then();
  }

  public navigateToLiked(): void {
    this.router.navigate([`/${AppRoutes.activities}/${this.user.id}/${ActivitiesRoutes.liked}`]).then();
  }

  public navigateToFollowers(): void {
    this.router.navigate([`/${AppRoutes.user}/${this.user.id}/${UserRoutes.followers}`]).then();
  }

  public navigateToFollowings(): void {
    this.router.navigate([`/${AppRoutes.user}/${this.user.id}/${UserRoutes.followings}`]).then();
  }
}
