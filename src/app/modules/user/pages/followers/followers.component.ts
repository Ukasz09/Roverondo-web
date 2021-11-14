import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data } from "@angular/router";
import { User } from "@app/core/models";
import { NgxSpinnerService } from "ngx-spinner";
import { SpinnerType } from "@app/core/enums";

@Component({
  selector: "app-followers",
  templateUrl: "./followers.component.html",
  styleUrls: ["./followers.component.scss"]
})
export class FollowersComponent implements OnInit {
  public followers: User[] = [];
  public user!: User;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly spinner: NgxSpinnerService
  ) {
  }

  public ngOnInit(): void {
    this.fetchFollowers();
  }

  public fetchFollowers(): void {
    this.activatedRoute.data.subscribe((data: Data) => {
      this.followers = data.followers;
      this.user = data.user;
      this.sortUsers();
      this.spinner.hide(SpinnerType.main).then();
    });
  }

  private sortUsers(): void {
    if (this.followers) {
      this.followers.sort((a, b) => {
        return a.nickname.localeCompare(b.nickname);
      });
    }
  }
}
