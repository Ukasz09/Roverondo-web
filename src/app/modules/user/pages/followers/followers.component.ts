import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { AppRoutes } from "@app/routes";
import { User } from "@app/core/models";
import { UserService } from "@app/core/services";

@Component({
  selector: "app-followers",
  templateUrl: "./followers.component.html",
  styleUrls: ["./followers.component.scss"]
})
export class FollowersComponent implements OnInit {
  public followers?: User[];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly userService: UserService
  ) {
  }

  public ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: (data: Data) => {
        if (!data.user) {
          this.router.navigate([AppRoutes.home]).then();
          return;
        }
        this.fetchFollowers(data.user.id);
      }
    });
  }

  public fetchFollowers(userId: string): void {
    this.userService.getFollowers$(userId).subscribe({
      next: (followers) => {
        this.followers = followers;
        this.sortUsers();
      }
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
