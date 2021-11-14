import { Injectable } from "@angular/core";
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import { Observable, of } from "rxjs";
import { WallPostsService, ScrollService } from "@app/core/services";
import { ActivityType } from "@app/core/models";
import { ActivitiesRoutes, SpinnerType } from "@app/core/enums";
import { Utils } from "@app/shared/utils";

@Injectable()
export class ActivitiesResolver implements Resolve<ActivityType[]> {

  constructor(
    private readonly activitiesService: WallPostsService,
    private readonly scrollService: ScrollService
  ) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ActivityType[]> {
    const userId = route.paramMap.get("userId") || "";
    if (userId) {
      const type = route.paramMap.get("type") || "";
      return this.getActivities$(+userId, 0, type);
    } else {
      console.error("UserId not provided - return []");
      return of([]);
    }
  }

  public getActivities$(userId: number, offset: number, type: string): Observable<ActivityType[]> {
    let activities$: Observable<ActivityType[]> = of([]);
    switch (type) {
      case ActivitiesRoutes.allActivities:
        activities$ = this.activitiesService.getActivities$(userId, offset);
        break;
      case ActivitiesRoutes.likedActivities:
        activities$ = this.activitiesService.getLikedActivities$(userId, offset);
        break;
      case ActivitiesRoutes.myActivities:
        activities$ = this.activitiesService.getMyActivities$(userId, offset);
        break;
      case ActivitiesRoutes.plannedActivities:
        activities$ = this.activitiesService.getPlannedActivities$(userId, offset);
        break;
      case ActivitiesRoutes.eventsActivities:
        activities$ = this.activitiesService.getEventActivities$(userId, offset);
        break;
    }
    this.scrollService.clearScrollPosition(Utils.getScrollContainerId(type));
    return activities$;
  }
}
