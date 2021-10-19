import { Component, Input, OnInit } from "@angular/core";
import { AppRoutes } from "@app/routes";
import { ActivitiesRoutes } from "@app/routes/activities";

@Component({
  selector: "app-drawer-menu",
  templateUrl: "./drawer-menu.component.html",
  styleUrls: ["./drawer-menu.component.scss"]
})
export class DrawerMenuComponent implements OnInit {
  public readonly AppRoutes = AppRoutes;
  public readonly ActivitiesRoutes = ActivitiesRoutes;

  @Input() menuForMobile = false;

  constructor() {
  }

  public ngOnInit(): void {
  }

  public getRouteLink(routes: string[]): string {
    return `/${routes.join("/")}`;

  }
}
