import { Injectable } from "@angular/core";
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot, Router
} from "@angular/router";
import { Observable, of, throwError } from "rxjs";
import { WallPostsService, ScrollService } from "@app/core/services";
import { ActivityType } from "@app/core/models";
import { ActivitiesRoutes, AppRoutes, SpinnerType } from "@app/core/enums";
import { Utils } from "@app/shared/utils";

@Injectable()
export class WallResolver implements Resolve<ActivityType[]> {

  constructor(
    private readonly wallPostsService: WallPostsService,
    private readonly scrollService: ScrollService,
    private readonly router: Router
  ) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ActivityType[]> {
    const userId = route.paramMap.get("userId") || "";
    if (userId) {
      const type = route.paramMap.get("type") || "";
      return this.getActivities$(+userId, 0, type);
    } else {
      this.router.navigate([`/${AppRoutes.home}`]).then();
      return throwError(`User not provided - redirected to /home`);
    }
  }

  public getActivities$(userId: number, offset: number, type: string): Observable<ActivityType[]> {
    let activities$: Observable<ActivityType[]> = of([]);
    switch (type) {
      case ActivitiesRoutes.completed:
        activities$ = this.wallPostsService.getCompletedActivities$(userId, offset);
        break;
      case ActivitiesRoutes.planned:
        activities$ = this.wallPostsService.getPlannedRoutes$(userId, offset);
        break;
      case ActivitiesRoutes.events:
        activities$ = this.wallPostsService.getEvents$(userId, offset);
        break;
      default:
        this.router.navigate([`/${AppRoutes.home}`]).then();
        return throwError(`Not found route for type = ${type}`);
    }
    this.scrollService.clearScrollPosition(Utils.getScrollContainerId(type));
    return activities$;
  }
}
