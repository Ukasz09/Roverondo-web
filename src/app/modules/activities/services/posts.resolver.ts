import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { ActivityType, PlannedPostExtended, PostExtended } from "@app/core/models";
import { CurrentUserService, PostsService, ScrollService } from "@app/core/services";
import { Observable, of, throwError } from "rxjs";
import { ActivitiesRoutes, AppRoutes, SpinnerType } from "@app/core/enums";
import { Utils } from "@app/shared/utils";
import { NgxSpinnerService } from "ngx-spinner";
import { switchMap, take } from "rxjs/operators";

@Injectable()
export class PostsResolver implements Resolve<ActivityType[]> {

  constructor(
    private readonly postsService: PostsService,
    private readonly scrollService: ScrollService,
    private readonly router: Router,
    private readonly spinner: NgxSpinnerService,
    private readonly currentUserService: CurrentUserService
  ) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ActivityType[]> {
    const userId = route.paramMap.get("userId") || "";
    if (userId) {
      const type = route.paramMap.get("type") || "";
      this.scrollService.clearScrollPosition(Utils.getScrollContainerId(type));
      return this.getActivities$(+userId, 0, type);
    } else {
      this.navigateHomeAndHideSpinner();
      return throwError(`User not provided - redirected to /home`);
    }
  }

  public getActivities$(userId: number, page: number, type: string): Observable<ActivityType[]> {
    switch (type) {
      case ActivitiesRoutes.completed:
        return this.getCompletedActivities$(userId, page);
      case ActivitiesRoutes.planned:
        return this.getPlannedRoutes$(userId, page);
      case ActivitiesRoutes.events:
        return this.postsService.getEvents$(userId, page);
      case ActivitiesRoutes.liked:
        return this.postsService.getLikedActivities$(userId, page);
      default:
        this.navigateHomeAndHideSpinner();
        return throwError(`Not found route for type = ${type}. Redirected to /home`);
    }
  }

  private getCompletedActivities$(userId: number, page: number): Observable<PostExtended[]> {
    return this.currentUserService.currentUser$.pipe(switchMap(currentUser => {
      if (currentUser) {
        return this.postsService.getCompletedActivities$(userId, currentUser.id, page);
      }
      this.navigateHomeAndHideSpinner();
      return throwError("Current user not found - activities not fetched");
    })).pipe(take(1));
  }

  private getPlannedRoutes$(userId: number, page: number): Observable<PlannedPostExtended[]> {
    return this.currentUserService.currentUser$.pipe(switchMap(currentUser => {
      if (currentUser) {
        return this.postsService.getPlannedRoutes$(userId, currentUser.id, page);
      }
      this.navigateHomeAndHideSpinner();
      return throwError("Current user not found - activities not fetched");
    })).pipe(take(1));
  }

  private navigateHomeAndHideSpinner(): void {
    this.router.navigate([`/${AppRoutes.home}`]).then();
    this.spinner.hide(SpinnerType.main).then();
  }
}
