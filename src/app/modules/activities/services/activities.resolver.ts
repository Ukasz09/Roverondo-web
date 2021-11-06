import { Injectable } from "@angular/core";
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import { Observable, of } from "rxjs";
import { ActivitiesRoutes } from "@app/routes/activities";
import { ActivitiesService } from "@app/core/services";
import { PostExtended } from "@app/core/models";

@Injectable()
export class ActivitiesResolver implements Resolve<PostExtended[]> {

  constructor(private readonly activitiesService: ActivitiesService) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PostExtended[]> {
    const userId = route.paramMap.get("userId") || "";
    if (userId) {
      const type = route.paramMap.get("type") || "";
      return this.getActivities$(+userId, 0, type);
    } else {
      console.error("UserId not provided - return []");
      return of([]);
    }
  }

  public getActivities$(userId: number, offset: number, type: string): Observable<PostExtended[]> {
    switch (type) {
      case ActivitiesRoutes.allActivities:
        return this.activitiesService.getAllActivities$(userId, offset);
      case ActivitiesRoutes.likedActivities:
        return this.activitiesService.getLikedActivities$(userId, offset);
      case ActivitiesRoutes.myActivities:
        return this.activitiesService.getMyActivities$(userId, offset);
    }
    return of([]);
  }
}
