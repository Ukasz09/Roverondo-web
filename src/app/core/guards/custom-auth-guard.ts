import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "@auth0/auth0-angular";
import { AppRoutes } from "@app/core/enums";

@Injectable({
  providedIn: "root"
})
export class CustomAuthGuard implements CanActivate {
  constructor(private readonly auth: AuthService, private readonly router: Router) {
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.auth.isAuthenticated$.subscribe(
      (authenticated: boolean) => {
        if (!authenticated) {
          this.router.navigate([AppRoutes.auth]).then();
        }
      }
    );
    return this.auth.isAuthenticated$;
  }
}
