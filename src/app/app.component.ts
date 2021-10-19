import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { Subscription } from "rxjs";
import { RoutesService } from "./core/services/routes.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  private routerEventsSubscription$?: Subscription;

  constructor(private readonly router: Router, private readonly routesService: RoutesService) {
  }

  public ngOnInit(): void {
    this.subscribeRouterEvents();
  }

  public ngOnDestroy(): void {
    this.routerEventsSubscription$?.unsubscribe();
  }

  private subscribeRouterEvents(): void {
    this.routerEventsSubscription$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)).subscribe({
      next: (routeEvent) => {
        const params = (routeEvent as NavigationEnd).url.split("/");
        this.routesService.setActualRoute(params[params.length - 1]);
      }
    });
  }

}
