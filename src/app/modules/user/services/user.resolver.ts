import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { User } from "@app/core/models";
import { UsersService } from "@app/core/services";

@Injectable()
export class UserResolver implements Resolve<User | undefined> {

  constructor(
    private readonly userService: UsersService
  ) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User | undefined> {
    const userId = route.paramMap.get("id");
    if (userId) {
      return this.userService.getUser$(+userId);
    }
    return of(undefined);
  }
}
