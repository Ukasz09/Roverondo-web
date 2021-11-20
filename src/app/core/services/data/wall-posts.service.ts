import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ActivityType, EventPostExtended, PlannedPostExtended, PostExtended } from "@app/core/models";
import { map, tap } from "rxjs/operators";
import { MockedPressureAdapterService, MockedSpeedAdapterService } from "../adapters";
import { environment } from "@app/env";

@Injectable({
  providedIn: "root"
})
export class WallPostsService {
  constructor(
    private readonly http: HttpClient,
    private readonly mockedSpeedAdapter: MockedSpeedAdapterService,
    private readonly mockedPressureAdapter: MockedPressureAdapterService
  ) {
  }

  public getCompletedActivities$(userId: number, offset = 0): Observable<PostExtended[]> {
    return this.getWall$({ userId, type: "ActivityPost", offset })
      .pipe(
        map(data => data as PostExtended[]),
        map(data => data.map(a => {
          a.workout.route.route = a.workout.route.route.filter(p => p.speed && p.speed < 80 / 3.6);
          a.workout.maxSpeed = Math.max(...a.workout.route.route.map(p => p.speed ?? 0));
          return a;
        })),
        map(data => data.map(p => this.mockedPressureAdapter.adapt(p)))
        // map(data => data.map(p => this.mockedSpeedAdapter.adapt(p)))
      );
  }

  public getPlannedRoutes$(userId: number, offset = 0): Observable<PlannedPostExtended[]> {
    return this.getWall$({ userId, type: "PlannedRoutePost", offset })
      .pipe(map(data => data as PlannedPostExtended[]));
  }

  public getEvents$(userId: number, offset = 0): Observable<EventPostExtended[]> {
    // TODO: integrate with backend
    return this.getPlannedRoutes$(userId, offset).pipe(
      map(data => data.map(a => {
        (a as any)["eventRoute"] = a.plannedRoute;
        return (a as unknown) as EventPostExtended;
      }))
    );
  }

  private getWall$({
                     userId,
                     type,
                     offset = 0,
                     extended = true,
                     amount = 3
                   }: wallRequestParameters): Observable<ActivityType[]> {
    const endpoint = `${environment.backendApi}/api/wall/${userId}?offset=${offset}&amount=${amount}&postTypes=${type}&extended=${extended}`;
    return this.http.get<(PostExtended | PlannedPostExtended)[]>(endpoint).pipe(
      tap(data => console.log(data))
    );
  }
}

export type wallRequestParameters = {
  userId: number;
  type: string;
  offset?: number;
  extended?: boolean;
  amount?: number;
};
