import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { User } from "@app/core/models";
import { UsersService } from "@app/core/services";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable, throwError } from "rxjs";
import { AppRoutes, SpinnerType } from "@app/core/enums";
import { catchError, tap } from "rxjs/operators";

@Injectable()
export class FollowingsResolver implements Resolve<User[]> {

  constructor(
    private readonly userService: UsersService,
    private readonly spinner: NgxSpinnerService,
    private readonly router: Router
  ) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
    this.spinner.show(SpinnerType.main).then();

    const userId = route.paramMap.get("id");
    if (!userId) {
      this.navigateToHome();
      return throwError(`User id not given`);
    }
    return this.userService.getFollowing$(+userId).pipe(
      tap(() => this.spinner.hide(SpinnerType.main).then()),
      catchError(() => {
        this.navigateToHome();
        return throwError(`Not found followings for user with id=${userId}`);
      })
    );
  }

  private navigateToHome(): void {
    this.router.navigate([AppRoutes.home]).then();
    this.spinner.hide(SpinnerType.main).then();
  }
}
