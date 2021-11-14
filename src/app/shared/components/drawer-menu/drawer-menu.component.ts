import { Component, EventEmitter, Inject, Input, OnInit, Output } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { DOCUMENT } from "@angular/common";
import { CurrentUserService } from "@app/core/services";
import { Router } from "@angular/router";
import { ActivitiesRoutes, AppRoutes, SpinnerType, UserRoutes } from "@app/core/enums";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-drawer-menu",
  templateUrl: "./drawer-menu.component.html",
  styleUrls: ["./drawer-menu.component.scss"]
})
export class DrawerMenuComponent implements OnInit {
  public readonly AppRoutes = AppRoutes;
  public readonly ActivitiesRoutes = ActivitiesRoutes;
  public readonly UserRoutes = UserRoutes;

  @Input() menuForMobile = false;

  @Output() closeDrawer = new EventEmitter<void>();

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    public readonly auth: AuthService,
    private readonly currentUserService: CurrentUserService,
    private readonly router: Router,
    private readonly spinner: NgxSpinnerService
  ) {
  }

  public ngOnInit(): void {
  }

  public getRouteLink(routes: string[]): string {
    return `/${routes.join("/")}`;
  }

  public logout(): void {
    this.auth.logout({ returnTo: document.location.origin });
    this.closeDrawer.emit();
  }

  public navigate(moduleRoute: string, subRoute: string): void {
    this.spinner.show(SpinnerType.main).then();
    this.currentUserService.currentUser$.subscribe((user) => {
      if (user) {
        const link = this.getRouteLink([moduleRoute, user.id.toString(), subRoute]);
        this.router.navigate([link]).then(() => {
        });
      } else {
        console.error("User not found - not navigate");
      }
      this.closeDrawer.emit();
    });
  }

  public get homeRouterLink(): string {
    return `/${AppRoutes.home}`;
  }
}
