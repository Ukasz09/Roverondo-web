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
    const type = route.paramMap.get("type") || "";
    return this.getActivities$(0, type);
  }

  public getActivities$(offset: number, type: string): Observable<PostExtended[]> {
    switch (type) {
      case ActivitiesRoutes.allActivities:
        return this.activitiesService.getAllActivities$(offset);
      case ActivitiesRoutes.likedActivities:
        return this.activitiesService.getLikedActivities$(offset);
      case ActivitiesRoutes.myActivities:
        return this.activitiesService.getMyActivities$(offset);
    }
    return of([]);
  }
}
