import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { EventPostExtended, PlannedPostExtended, PostComment, PostExtended, Reaction } from "@app/core/models";
import { map, tap } from "rxjs/operators";
import { MockedSpeedAdapterService } from "../adapters";
import { environment } from "@app/env";

@Injectable({
  providedIn: "root"
})
export class ActivitiesService {
  constructor(private readonly http: HttpClient, private readonly mockedSpeedAdapter: MockedSpeedAdapterService) {
  }

  public getActivityPostWall$(userId: number, offset = 0): Observable<PostExtended[]> {
    return this.getWall$({ userId: userId, type: "ActivityPost", offset: offset })
      .pipe(
        map(data => data as PostExtended[]),
        map(data => data.map(p => this.mockedSpeedAdapter.adapt(p)))
      );
  }

  public getMyActivityPostWall$(userId: number, offset = 0): Observable<PostExtended[]> {
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
    return this.getActivityPostWall$(userId, offset);
  }

  public addReactionToActivity$(userId: number, activityId: number): Observable<void> {
    const endpoint = `${environment.backendApi}/api/posts/reactions`;
    const reaction = {
      "createdAt": new Date().toISOString(),
      "postId": activityId,
      "userId": userId
    };
    return this.http.post<void>(endpoint, reaction);
  }

  public removeReactionFromActivity$(userId: number, activityId: number): Observable<void> {
    const endpoint = `${environment.backendApi}/api/posts/reactions?post=${activityId}&user=${userId}`;
    return this.http.delete<void>(endpoint);
  }

  public removeReactionFromComment$(reactionId: number): Observable<void> {
    const endpoint = `${environment.backendApi}/api/comments/reactions/${reactionId}`;
    return this.http.delete<void>(endpoint);
  }

  public addReactionToComment$(userId: number, commentId: number): Observable<void> {
    const endpoint = `${environment.backendApi}/api/comments/reactions`;
    const payload = {
      "commentId": commentId,
      "createdAt": new Date().toISOString(),
      "userId": userId
    };
    return this.http.post<void>(endpoint, payload);
  }

  public getComments$(activityId: string): Observable<PostComment[]> {
    const endpoint = `${environment.backendApi}/api/posts/${activityId}/comments`;
    return this.http.get<PostComment[]>(endpoint).pipe(tap(data => console.log(data)));
  }

  public getReactions$(activityId: string): Observable<Reaction[]> {
    const endpoint = `${environment.backendApi}/api/posts/${activityId}/reactions`;
    return this.http.get<Reaction[]>(endpoint).pipe(tap(data => console.log(data)));
  }

  public addComment(userId: number, activityId: string, commentText: string): Observable<void> {
    const endpoint = `${environment.backendApi}/api/comments`;
    const comment = {
      "createdAt": new Date().toISOString(),
      "postId": activityId,
      "text": commentText,
      "userId": userId
    };
    return this.http.post<void>(endpoint, comment);
  }

  public getCommentsReactions(commentId: number): Observable<Reaction[]> {
    const endpoint = `${environment.backendApi}/api/comments/${commentId}/reactions`;
    return this.http.get<Reaction[]>(endpoint);
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
