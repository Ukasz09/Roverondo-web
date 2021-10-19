import { Injectable } from "@angular/core";
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import { Observable, of } from "rxjs";
import { ActivitiesRoutes } from "@app/routes/activities";
import { ActivitiesService } from "@app/core/services";
import { ActivityPost } from "@app/core/models";

@Injectable()
export class ActivitiesResolver implements Resolve<ActivityPost[]> {

  constructor(private readonly activitiesService: ActivitiesService) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ActivityPost[]> {
    const type = route.paramMap.get("type");
    switch (type) {
      case ActivitiesRoutes.allActivities:
        return this.activitiesService.getAllActivities();
      case ActivitiesRoutes.likedActivities:
        return this.activitiesService.getLikedActivities();
      case ActivitiesRoutes.myActivities:
        return this.activitiesService.getMyActivities();
    }
    return of([]);
  }
}
