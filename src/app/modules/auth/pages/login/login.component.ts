import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppRoutes, AuthRoutes, Icons } from "@app/core/enums";
import { Utils } from "@app/shared/utils";
import { LayoutService } from "@app/core/services";
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy {
  public readonly Icons = Icons;

  constructor(
    private readonly router: Router,
    private readonly layoutService: LayoutService,
    private readonly auth: AuthService) {
  }

  public ngOnInit(): void {
    this.layoutService.setNavbarLayoutType();
  }

  public ngOnDestroy(): void {
    this.layoutService.setAsideLayoutType(window.innerWidth);
  }

  public getIconPath(iconName: string): string {
    return Utils.getIconPath(iconName);
  }

  public onSignInClick(): void {
    const redirectUri = `${window.location.origin}/${AppRoutes.auth}/${AuthRoutes.signInCallback}`;
    this.auth.loginWithRedirect({ redirect_uri: redirectUri });
  }
}
