import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { User } from "@app/core/models";
import { UsersService } from "@app/core/services";
import { NgxSpinnerService } from "ngx-spinner";
import { tap } from "rxjs/operators";
import { SpinnerType } from "@app/core/enums";

@Injectable()
export class UserResolver implements Resolve<User | undefined> {

  constructor(
    private readonly userService: UsersService,
    private readonly spinner: NgxSpinnerService
  ) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User | undefined> {
    const userId = route.paramMap.get("id");
    this.spinner.show(SpinnerType.main).then();
    if (userId) {
      return this.userService.getUser$(+userId).pipe(tap(() => this.spinner.hide(SpinnerType.main)));
    } else {
      return of(undefined).pipe(tap(() => this.spinner.hide(SpinnerType.main)));
    }
  }
}
