import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { EventPostExtended, PlannedPostExtended, PostComment, PostExtended, PostReaction } from "@app/core/models";
import { map, tap } from "rxjs/operators";
import { MockedSpeedAdapterService } from "../adapters";

@Injectable({
  providedIn: "root"
})
export class ActivitiesService {
  constructor(private readonly http: HttpClient, private readonly mockedSpeedAdapter: MockedSpeedAdapterService) {
  }

  // TODO: cleanup - user object instead of params
  public getAllActivities$(userId: number, offset = 0, extended = true, amount = 3): Observable<PostExtended[]> {
    const endpoint = `api/wall/${userId}?offset=${offset}&amount=${amount}&postTypes=ActivityPost&extended=${extended}`;
    return this.http.get<PostExtended[]>(endpoint).pipe(
      map(data => data.map(post => this.mockedSpeedAdapter.adapt(post))),
      tap(data => console.log(data))
    );
  }

  public getMyActivities$(userId: number, offset = 0, type = "ActivityPost", extended = true, amount = 3): Observable<PostExtended[]> {
    return of([]);
  }

  public getPlannedActivities$(userId: number, offset = 0, extended = true, amount = 3): Observable<PlannedPostExtended[]> {
    const endpoint = `api/wall/${userId}?offset=${offset}&amount=${amount}&postTypes=PlannedRoutePost&extended=${extended}`;
    return this.http.get<PlannedPostExtended[]>(endpoint).pipe(
      tap(data => console.log(data))
    );
  }

  public getEventActivities$(userId: number, offset = 0, extended = true, amount = 3): Observable<EventPostExtended[]> {
    // TODO: tmp mocked
    // const endpoint = `api/wall/${userId}?offset=${offset}&amount=${amount}&postTypes=EventRoutePost&extended=${extended}`;
    // return this.http.get<PostExtended[]>(endpoint).pipe(
    //   tap(data => console.log(data))
    // );
    return this.getPlannedActivities$(userId, offset, extended, amount).pipe(
      map(data => data.map(a => {
        (a as any)["eventRoute"] = a.plannedRoute;
        return (a as unknown) as EventPostExtended;
      }))
    );
  }

  public getLikedActivities$(userId: number, offset = 0, type = "ActivityPost", extended = true, amount = 3): Observable<PostExtended[]> {
    // TODO: integrate with backend
    const endpoint = `api/wall/${userId}?offset=${offset}&amount=${amount}&postTypes=${type}&extended=${extended}`;
    return this.http.get<PostExtended[]>(endpoint).pipe(tap(data => console.log(data)));
  }

  public addReactionToActivity$(userId: number, activityId: number): Observable<void> {
    const endpoint = "api/posts/reactions";
    const reaction = {
      "createdAt": new Date().toISOString(),
      "postId": activityId,
      "userId": userId
    };
    return this.http.post<void>(endpoint, reaction);
  }

  public removeReactionFromActivity$(userId: number, activityId: number): Observable<void> {
    const endpoint = `api/posts/reactions?post=${activityId}&user=${userId}`;
    return this.http.delete<void>(endpoint);
  }

  public getComments$(activityId: string): Observable<PostComment[]> {
    const endpoint = `api/posts/${activityId}/comments`;
    return this.http.get<PostComment[]>(endpoint).pipe(tap(data => console.log(data)));
  }

  public getReactions$(activityId: string): Observable<PostReaction[]> {
    const endpoint = `api/posts/${activityId}/reactions`;
    return this.http.get<PostReaction[]>(endpoint).pipe(tap(data => console.log(data)));
  }

  public addComment(userId: number, activityId: string, commentText: string): Observable<void> {
    const endpoint = "api/comments";
    const comment = {
      "createdAt": new Date().toISOString(),
      "postId": activityId,
      "text": commentText,
      "userId": userId
    };
    return this.http.post<void>(endpoint, comment);
  }
}
