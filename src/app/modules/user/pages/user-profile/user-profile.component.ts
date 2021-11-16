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
    this.navigateWithSpinner(`/${AppRoutes.activities}/${this.user.id}/${ActivitiesRoutes.completed}`);
  }

  public navigateToPlannedRoutes(): void {
    this.navigateWithSpinner(`/${AppRoutes.activities}/${this.user.id}/${ActivitiesRoutes.planned}`);
  }

  public navigateToEvents(): void {
    this.navigateWithSpinner(`/${AppRoutes.activities}/${this.user.id}/${ActivitiesRoutes.events}`);
  }

  public navigateToLiked(): void {
    this.navigateWithSpinner(`/${AppRoutes.activities}/${this.user.id}/${ActivitiesRoutes.liked}`);
  }

  public navigateToFollowers(): void {
    this.navigateWithSpinner(`/${AppRoutes.user}/${this.user.id}/${UserRoutes.followers}`);
  }

  public navigateToFollowings(): void {
    this.navigateWithSpinner(`/${AppRoutes.user}/${this.user.id}/${UserRoutes.followings}`);
  }

  private navigateWithSpinner(route: string): void {
    this.router.navigate([route]).then();
    this.spinner.show(SpinnerType.main).then();
  }
}
