import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { ActivityType } from "@app/core/models";
import { PostsService, ScrollService } from "@app/core/services";
import { Observable, of, throwError } from "rxjs";
import { ActivitiesRoutes, AppRoutes } from "@app/core/enums";
import { Utils } from "@app/shared/utils";

@Injectable()
export class PostsResolver implements Resolve<ActivityType[]> {

  constructor(
    private readonly postsService: PostsService,
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
        activities$ = this.postsService.getCompletedActivities$(userId, offset);
        break;
      case ActivitiesRoutes.planned:
        activities$ = this.postsService.getPlannedRoutes$(userId, offset);
        break;
      case ActivitiesRoutes.events:
        activities$ = this.postsService.getEvents$(userId, offset);
        break;
      case ActivitiesRoutes.liked:
        activities$ = this.postsService.getLikedActivities$(userId, offset);
        break;
      default:
        this.router.navigate([`/${AppRoutes.home}`]).then();
        return throwError(`Not found route for type = ${type}. Redirected to /home`);
    }
    this.scrollService.clearScrollPosition(Utils.getScrollContainerId(type));
    return activities$;
  }
}
