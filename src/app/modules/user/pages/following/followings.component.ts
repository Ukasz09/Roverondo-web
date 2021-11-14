import { Component, OnInit } from "@angular/core";
import { User } from "@app/core/models";
import { ActivatedRoute, Data } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { SpinnerType } from "@app/core/enums";

@Component({
  selector: "app-following",
  templateUrl: "./followings.component.html",
  styleUrls: ["./followings.component.scss"]
})
export class FollowingsComponent implements OnInit {
  public followings: User[] = [];
  public user!: User;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly spinner: NgxSpinnerService
  ) {
  }

  public ngOnInit(): void {
    this.fetchFollowing();
  }

  public fetchFollowing(): void {
    this.activatedRoute.data.subscribe((data: Data) => {
      this.followings = data.followings;
      this.user = data.user;
      this.sortUsers();
      this.spinner.hide(SpinnerType.main).then();
    });
  }

  private sortUsers(): void {
    if (this.followings) {
      this.followings.sort((a, b) => {
        return a.nickname.localeCompare(b.nickname);
      });
    }
  }
}
