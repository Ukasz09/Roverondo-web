import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@app/env";
import {
  ActivityType,
  EventPostExtended,
  PlannedPostExtended,
  PostComment,
  PostExtended,
  Reaction
} from "@app/core/models";
import { map, tap } from "rxjs/operators";
import { MockedPressureAdapterService, MockedSpeedAdapterService } from "../adapters";

@Injectable({
  providedIn: "root"
})
export class PostsService {
  public static readonly amountPerPage = 3;

  constructor(
    private readonly http: HttpClient,
    private readonly mockedSpeedAdapter: MockedSpeedAdapterService,
    private readonly mockedPressureAdapter: MockedPressureAdapterService
  ) {
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

  public addComment$(userId: number, activityId: string, commentText: string): Observable<void> {
    const endpoint = `${environment.backendApi}/api/comments`;
    const comment = {
      "createdAt": new Date().toISOString(),
      "postId": activityId,
      "text": commentText,
      "userId": userId
    };
    return this.http.post<void>(endpoint, comment);
  }

  public getCommentsReactions$(commentId: number): Observable<Reaction[]> {
    const endpoint = `${environment.backendApi}/api/comments/${commentId}/reactions`;
    return this.http.get<Reaction[]>(endpoint);
  }

  public getCompletedActivities$(userId: number, offset = 0): Observable<PostExtended[]> {
    // TODO: tmp mocked - integrate with backend
    const endpoint = `${environment.backendApi}/api/wall/${userId}?offset=${offset}&amount=3&postTypes=ActivityPost&extended=true`;
    return this.http.get<ActivityType[]>(endpoint).pipe(
      tap(data => console.log(data)),
      map(data => data as PostExtended[]),
      // map(data => data.map(p => this.mockedSpeedAdapter.adapt(p))),
      map(data => data.map(p => this.mockedPressureAdapter.adapt(p)))
    );
  }

  public getPlannedRoutes$(userId: number, offset = 0): Observable<PlannedPostExtended[]> {
    // TODO: tmp mocked - integrate with backend
    const endpoint = `${environment.backendApi}/api/wall/${userId}?offset=${offset}&amount=3&postTypes=PlannedRoutePost&extended=true`;
    return this.http.get<ActivityType[]>(endpoint).pipe(
      tap(data => console.log(data)),
      map(data => data as PlannedPostExtended[])
    );
  }

  public getEvents$(userId: number, offset = 0): Observable<EventPostExtended[]> {
    // TODO: tmp mocked - integrate with backend
    return this.getPlannedRoutes$(userId, offset).pipe(
      map(data => data.map(a => {
        (a as any)["eventRoute"] = a.plannedRoute;
        return (a as unknown) as EventPostExtended;
      }))
    );
  }

  public getLikedActivities$(userId: number, page = 0): Observable<PostExtended[]> {
    // TODO: support for multi types
    const endpoint = `${environment.backendApi}/api/wall/liked/${userId}?page=${page}&amount=${PostsService.amountPerPage}&postTypes=ActivityPost&extended=true`;
    return this.http.get<ActivityType[]>(endpoint).pipe(
      tap(data => console.log(data)),
      map(data => data as PostExtended[]),
      map(data => data.map(p => this.mockedPressureAdapter.adapt(p)))
    );
  }
}
