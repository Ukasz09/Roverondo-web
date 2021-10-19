import { Component, Input, OnInit } from "@angular/core";
import { Routes } from "@app/routes";
import { ActivitiesRoutes } from "@app/routes/activities";

@Component({
  selector: "app-drawer-menu",
  templateUrl: "./drawer-menu.component.html",
  styleUrls: ["./drawer-menu.component.scss"]
})
export class DrawerMenuComponent implements OnInit {
  public readonly AppRoutes = Routes;
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
