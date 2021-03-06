import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { User, UserExtended } from "@app/core/models";
import { UsersService } from "@app/core/services";
import { catchError } from "rxjs/operators";
import { AppRoutes, SpinnerType } from "@app/core/enums";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: "root"
})
export class UserResolver implements Resolve<User> {

  constructor(
    private readonly userService: UsersService,
    private readonly router: Router,
    private readonly spinner: NgxSpinnerService
  ) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    const userId = route.paramMap.get("userId");
    return this.resolveUser(userId);
  }

  protected resolveUser(userId: string | null, extended = false): Observable<User | UserExtended> {
    if (!userId || isNaN(+userId)) {
      this.navigateHomeAndHideSpinner();
      return throwError("User id not given");
    }
    return this.userService.getUser$(+userId, extended).pipe(
      catchError(() => {
        this.navigateHomeAndHideSpinner();
        return throwError(`Not found user with id=${userId}`);
      })
    );
  }

  private navigateHomeAndHideSpinner(): void {
    this.router.navigate([AppRoutes.home]).then();
    this.spinner.hide(SpinnerType.main).then();
  }
}
