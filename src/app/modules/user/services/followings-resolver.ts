import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { User } from "@app/core/models";
import { UsersService } from "@app/core/services";
import { Observable, throwError } from "rxjs";
import { AppRoutes, SpinnerType } from "@app/core/enums";
import { catchError, tap } from "rxjs/operators";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class FollowingsResolver implements Resolve<User[]> {

  constructor(
    private readonly userService: UsersService,
    private readonly router: Router,
    private readonly spinner: NgxSpinnerService
  ) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
    const userId = route.paramMap.get("userId");
    if (!userId) {
      this.navigateHomeAndHideSpinner();
      return throwError(`User id not given`);
    }
    return this.userService.getFollowing$(+userId).pipe(
      catchError(() => {
        this.navigateHomeAndHideSpinner();
        return throwError(`Not found followings for user with id=${userId}`);
      })
    );
  }

  private navigateHomeAndHideSpinner(): void {
    this.router.navigate([AppRoutes.home]).then();
    this.spinner.hide(SpinnerType.main).then();
  }
}
