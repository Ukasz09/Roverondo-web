import { Component, OnInit } from "@angular/core";
import { User } from "@app/core/models";
import { ActivatedRoute, Data } from "@angular/router";

@Component({
  selector: "app-following",
  templateUrl: "./followings.component.html"
})
export class FollowingsComponent implements OnInit {
  public followings: User[]=[];

  constructor(
    private readonly activatedRoute: ActivatedRoute
  ) {
  }

  public ngOnInit(): void {
    this.fetchFollowing();
  }

  public fetchFollowing(): void {
    this.activatedRoute.data.subscribe((data: Data) => {
      this.followings = data.followings;
      this.sortUsers();
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
