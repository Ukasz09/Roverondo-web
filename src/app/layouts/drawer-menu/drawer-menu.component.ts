import { Component, Input, OnInit } from "@angular/core";
import { AppRoutes } from "@app/routes";

@Component({
  selector: "app-drawer-menu",
  templateUrl: "./drawer-menu.component.html",
  styleUrls: ["./drawer-menu.component.scss"]
})
export class DrawerMenuComponent implements OnInit {
  public readonly AppRoutes = AppRoutes;

  @Input() menuForMobile = false;

  constructor() {
  }

  public ngOnInit(): void {
  }

  public getRouteLink(route: string): string {
    return `/${route}`;
  }
}
