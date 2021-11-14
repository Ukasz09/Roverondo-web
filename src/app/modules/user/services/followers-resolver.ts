import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { User } from "@app/core/models";
import { UsersService } from "@app/core/services";
import { Observable, throwError } from "rxjs";
import { AppRoutes } from "@app/core/enums";
import { catchError } from "rxjs/operators";

@Injectable()
export class FollowersResolver implements Resolve<User[]> {

  constructor(
    private readonly userService: UsersService,
    private readonly router: Router
  ) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
    const userId = route.paramMap.get("userId");
    if (!userId) {
      this.navigateToHome();
      return throwError(`User id not given`);
    }
    return this.userService.getFollowers$(+userId).pipe(
      catchError(() => {
        this.navigateToHome();
        return throwError(`Not found followers for user with id=${userId}`);
      })
    );
  }

  private navigateToHome(): void {
    this.router.navigate([AppRoutes.home]).then();
  }
}
