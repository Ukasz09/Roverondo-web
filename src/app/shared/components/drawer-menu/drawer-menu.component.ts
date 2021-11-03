import { Component, EventEmitter, Inject, Input, OnInit, Output } from "@angular/core";
import { AppRoutes } from "@app/routes";
import { ActivitiesRoutes } from "@app/routes/activities";
import { AuthService } from "@auth0/auth0-angular";
import { Utils } from "@app/shared/utils";
import { DOCUMENT } from "@angular/common";

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

  constructor(public readonly auth: AuthService, @Inject(DOCUMENT) private readonly document: Document) {
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
}
