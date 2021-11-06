import { Component, OnInit } from "@angular/core";
import { User } from "@app/core/models";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { UsersService } from "@app/core/services";
import { AppRoutes } from "@app/routes";
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: "app-following",
  templateUrl: "./following.component.html",
  styleUrls: ["./following.component.scss"]
})
export class FollowingComponent implements OnInit {
  public following?: User[];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly userService: UsersService,
    private readonly authService: AuthService
  ) {
  }

  public ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: (data: Data) => {
        if (!data.user) {
          this.authService.user$.subscribe({
            next: user => {
              if (!user) {
                this.router.navigate([AppRoutes.home]).then();
              } else {
                this.fetchFollowing(user.id);
              }
            }
          });
          return;
        }
        this.fetchFollowing(data.user.id);
      }
    });
  }

  public fetchFollowing(userId: string): void {
    this.userService.getFollowing$(userId).subscribe({
      next: (followers) => {
        this.following = followers;
        this.sortUsers();
      }
    });
  }

  private sortUsers(): void {
    if (this.following) {
      this.following.sort((a, b) => {
        return a.nickname.localeCompare(b.nickname);
      });
    }
  }

}
