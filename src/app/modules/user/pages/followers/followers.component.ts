import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data } from "@angular/router";
import { User } from "@app/core/models";

@Component({
  selector: "app-followers",
  templateUrl: "./followers.component.html",
  styleUrls: ["./followers.component.scss"]
})
export class FollowersComponent implements OnInit {
  public followers: User[] = [];

  constructor(
    private readonly activatedRoute: ActivatedRoute
  ) {
  }

  public ngOnInit(): void {
    this.fetchFollowers();
  }

  public fetchFollowers(): void {
    this.activatedRoute.data.subscribe((data: Data) => {
      this.followers = data.followers;
      this.sortUsers();
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
