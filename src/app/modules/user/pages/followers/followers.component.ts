import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { AppRoutes } from "@app/routes";
import { User } from "@app/core/models";
import { CurrentUserService, UsersService } from "@app/core/services";
import { Observable, throwError } from "rxjs";
import { switchMap } from "rxjs/operators";

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
    private readonly userService: UsersService,
    private readonly currentUserService: CurrentUserService
  ) {
  }

  public ngOnInit(): void {
    this.fetchFollowers();
  }

  private getFollowersUsersData$(): Observable<User[]> {
    return this.activatedRoute.data.pipe(
      switchMap((data: Data) => {
        if (!data.user) {
          return this.currentUserService.currentUser$.pipe(
            switchMap(currentUser => {
              if (!currentUser) {
                this.router.navigate([AppRoutes.home]).then();
                return throwError("Not found current user");
              } else {
                return this.userService.getFollowers$(currentUser.id);
              }
            })
          );
        }
        return this.userService.getFollowers$(data.user.id);
      })
    );
  }

  public fetchFollowers(): void {
    this.getFollowersUsersData$().subscribe((followers) => {
      this.followers = followers;
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
