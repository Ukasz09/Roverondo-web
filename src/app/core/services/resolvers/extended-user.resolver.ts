import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { UserExtended } from "@app/core/models";
import { Observable } from "rxjs";
import { UserResolver } from "./user.resolver";

@Injectable({
  providedIn: "root"
})
export class ExtendedUserResolver extends UserResolver {

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserExtended> {
    const userId = route.paramMap.get("userId");
    return this.resolveUser(userId, true) as Observable<UserExtended>;
  }
}
