import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { BehaviorSubject, Subscription } from "rxjs";
import { CurrentUserService, RoutesService } from "@app/core/services";
import { AuthService } from "@auth0/auth0-angular";
import { NgxSpinnerService } from "ngx-spinner";
import { SpinnerType } from "@app/core/enums";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  public spinnerName = SpinnerType.main;

  private appIsLoadingSubject$: BehaviorSubject<boolean>;
  private routerEventsSubscription$?: Subscription;
  private authLoading$?: Subscription;

  constructor(
    private readonly router: Router,
    private readonly routesService: RoutesService,
    public readonly auth: AuthService,
    private readonly spinner: NgxSpinnerService,
    private readonly currentUserService: CurrentUserService
  ) {
    this.appIsLoadingSubject$ = new BehaviorSubject<boolean>(true);
  }

  public ngOnInit(): void {
    this.loadApp();
    this.subscribeRouterEvents();
    this.spinner.show(SpinnerType.main).then();
  }

  public ngOnDestroy(): void {
    this.routerEventsSubscription$?.unsubscribe();
    this.authLoading$?.unsubscribe();
  }

  private subscribeRouterEvents(): void {
    this.routerEventsSubscription$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)).subscribe((routeEvent) => {
      const params = (routeEvent as NavigationEnd).url.split("/");
      this.routesService.setActualRoute(params[params.length - 1]);
    });
  }

  private loadApp(): void {
    this.authLoading$ = this.auth.isLoading$.subscribe((loading) => {
      loading ? this.spinner.show(SpinnerType.main) : this.spinner.hide(SpinnerType.main);
      if (!loading) {
        this.currentUserService.fetchCurrentUser();
      }
    });
  }
}
