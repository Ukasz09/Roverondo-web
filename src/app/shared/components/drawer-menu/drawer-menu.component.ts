import { Component, EventEmitter, Inject, Input, OnInit, Output } from "@angular/core";
import { AppRoutes } from "@app/routes";
import { ActivitiesRoutes } from "@app/routes/activities";
import { AuthService } from "@auth0/auth0-angular";
import { Utils } from "@app/shared/utils";
import { DOCUMENT } from "@angular/common";
import { CurrentUserService } from "@app/core/services";
import { Router } from "@angular/router";

@Component({
  selector: "app-drawer-menu",
  templateUrl: "./drawer-menu.component.html",
  styleUrls: ["./drawer-menu.component.scss"]
})
export class DrawerMenuComponent implements OnInit {
  public readonly AppRoutes = AppRoutes;
  public readonly ActivitiesRoutes = ActivitiesRoutes;

  @Input() menuForMobile = false;

  @Output() closeDrawer = new EventEmitter<void>();

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    public readonly auth: AuthService,
    private readonly currentUserService: CurrentUserService,
    private readonly router: Router
  ) {
  }

  public ngOnInit(): void {
  }

  public getRouteLink(routes: string[]): string {
    return `/${routes.join("/")}`;
  }

  public getDefaultUserPicture(name?: string): string {
    return Utils.getInitialsImage(name as string);
  }

  public logout(): void {
    this.auth.logout({ returnTo: document.location.origin });
    this.closeDrawer.emit();
  }

  public navigateToActivity(type: ActivitiesRoutes): void {
    this.currentUserService.currentUser$.subscribe({
      next: user => {
        if (user) {
          const link = this.getRouteLink([AppRoutes.activities, user.id.toString(), type]);
          this.router.navigate([link]).then(() => {
          });
        } else {
          console.error("User not found - not navigate");
        }
        this.closeDrawer.emit();
      }
    });
  }

  public get homeRouterLink(): string {
    return `/${AppRoutes.home}`;
  }
}
