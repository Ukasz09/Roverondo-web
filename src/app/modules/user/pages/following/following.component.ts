import { Component, OnInit } from "@angular/core";
import { User } from "@app/core/models";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { CurrentUserService, UsersService } from "@app/core/services";
import { AppRoutes } from "@app/routes";
import { switchMap } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

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
    private readonly currentUserService: CurrentUserService
  ) {
  }

  public ngOnInit(): void {
    this.fetchFollowing();
  }

  private getFollowingUsersData$(): Observable<User[]> {
    return this.activatedRoute.data.pipe(
      switchMap((data: Data) => {
        if (!data.user) {
          return this.currentUserService.currentUser$.pipe(
            switchMap(currentUser => {
              if (!currentUser) {
                this.router.navigate([AppRoutes.home]).then();
                return throwError("Not found current user");
              } else {
                return this.userService.getFollowing$(currentUser.id);
              }
            })
          );
        }
        return this.userService.getFollowing$(data.user.id);
      })
    );
  }

  public fetchFollowing(): void {
    this.getFollowingUsersData$().subscribe((followers) => {
      this.following = followers;
      this.sortUsers();
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
