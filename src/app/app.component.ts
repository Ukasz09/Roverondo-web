import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { Subscription } from "rxjs";
import { CurrentUserService, RoutesService } from "@app/core/services";
import { AuthService } from "@auth0/auth0-angular";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  private routerEventsSubscription$?: Subscription;
  private authLoading$?: Subscription;

  constructor(
    private readonly router: Router,
    private readonly routesService: RoutesService,
    public readonly auth: AuthService,
    private readonly spinner: NgxSpinnerService,
    private readonly currentUserService: CurrentUserService
  ) {
  }

  public ngOnInit(): void {
    this.subscribeAuthIsLoading();
    this.subscribeRouterEvents();
    this.spinner.show().then(_ => {
    });
  }

  public ngOnDestroy(): void {
    this.routerEventsSubscription$?.unsubscribe();
    this.authLoading$?.unsubscribe();
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

  private subscribeAuthIsLoading(): void {
    this.authLoading$ = this.auth.isLoading$.subscribe((loaded) => {
      if (!loaded) {
        this.currentUserService.fetchCurrentUser();
      }
    });
  }
}
