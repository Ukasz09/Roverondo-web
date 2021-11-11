import { Injectable } from "@angular/core";
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import { Observable, of } from "rxjs";
import { ActivitiesService, ScrollService } from "@app/core/services";
import { ActivityType } from "@app/core/models";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivitiesRoutes, SpinnerType } from "@app/core/enums";
import { tap } from "rxjs/operators";
import { Utils } from "@app/shared/utils";

@Injectable()
export class ActivitiesResolver implements Resolve<ActivityType[]> {

  constructor(
    private readonly activitiesService: ActivitiesService,
    private readonly spinner: NgxSpinnerService,
    private readonly scrollService: ScrollService
  ) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ActivityType[]> {
    const userId = route.paramMap.get("userId") || "";
    if (userId) {
      const type = route.paramMap.get("type") || "";
      return this.getActivities$(+userId, 0, type, true);
    } else {
      console.error("UserId not provided - return []");
      return of([]);
    }
  }

  public getActivities$(userId: number, offset: number, type: string, withSpinner = false): Observable<ActivityType[]> {
    if (withSpinner) {
      this.spinner.show(SpinnerType.main).then();
    }
    let activities$: Observable<ActivityType[]> = of([]);
    switch (type) {
      case ActivitiesRoutes.allActivities:
        activities$ = this.activitiesService.getActivityPostWall$(userId, offset);
        break;
      case ActivitiesRoutes.likedActivities:
        activities$ = this.activitiesService.getLikedActivities$(userId, offset);
        break;
      case ActivitiesRoutes.myActivities:
        activities$ = this.activitiesService.getMyActivityPostWall$(userId, offset);
        break;
      case ActivitiesRoutes.plannedActivities:
        activities$ = this.activitiesService.getPlannedActivities$(userId, offset);
        break;
      case ActivitiesRoutes.eventsActivities:
        activities$ = this.activitiesService.getEventActivities$(userId, offset);
        break;
    }
    this.scrollService.clearScrollPosition(Utils.getScrollContainerId(type));
    return activities$.pipe(tap(() => {
      if (withSpinner) {
        this.spinner.hide(SpinnerType.main).then();
      }
    }));
  }
}
