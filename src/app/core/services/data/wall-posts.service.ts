import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { EventPostExtended, PlannedPostExtended, PostExtended, Reaction } from "@app/core/models";
import { map, tap } from "rxjs/operators";
import { MockedSpeedAdapterService } from "../adapters";
import { environment } from "@app/env";

@Injectable({
  providedIn: "root"
})
export class WallPostsService {
  constructor(private readonly http: HttpClient, private readonly mockedSpeedAdapter: MockedSpeedAdapterService) {
  }

  public getActivities$(userId: number, offset = 0): Observable<PostExtended[]> {
    return this.getWall$({ userId: userId, type: "ActivityPost", offset: offset })
      .pipe(
        map(data => data as PostExtended[]),
        map(data => data.map(p => this.mockedSpeedAdapter.adapt(p)))
      );
  }

  public getMyActivities$(userId: number, offset = 0): Observable<PostExtended[]> {
    // TODO: integrate with backend
    return this.getWall$({ userId: userId, type: "ActivityPost", offset: offset })
      .pipe(
        map(data => data as PostExtended[]),
        map(data => data.map(p => this.mockedSpeedAdapter.adapt(p)))
      );
  }

  public getPlannedActivities$(userId: number, offset = 0): Observable<PlannedPostExtended[]> {
    return this.getWall$({ userId: userId, type: "PlannedRoutePost", offset: offset })
      .pipe(map(data => data as PlannedPostExtended[]));
  }

  public getEventActivities$(userId: number, offset = 0): Observable<EventPostExtended[]> {
    // TODO: integrate with backend
    return this.getPlannedActivities$(userId, offset).pipe(
      map(data => data.map(a => {
        (a as any)["eventRoute"] = a.plannedRoute;
        return (a as unknown) as EventPostExtended;
      }))
    );
  }

  public getLikedActivities$(userId: number, offset = 0): Observable<PostExtended[]> {
    // TODO: integrate with backend
    return this.getActivities$(userId, offset);
  }

  private getWall$({
                     userId,
                     type,
                     offset = 0,
                     extended = true,
                     amount = 3
                   }: wallRequestParameters): Observable<(PostExtended | PlannedPostExtended)[]> {
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
