import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@app/env";
import {
  ActivityType, EventPostExtended,
  PlannedPostExtended,
  PostComment,
  PostExtended,
  Reaction
} from "@app/core/models";
import { map, tap } from "rxjs/operators";
import { MockedPressureAdapterService, MockedSpeedAdapterService, SpeedFixAdapterService } from "../adapters";

@Injectable({
  providedIn: "root"
})
export class PostsService {
  public static readonly amountPerPage = 3;

  constructor(
    private readonly http: HttpClient,
    private readonly mockedSpeedAdapter: MockedSpeedAdapterService,
    private readonly mockedPressureAdapter: MockedPressureAdapterService,
    private readonly speedFixAdapter: SpeedFixAdapterService
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

  public removeReactionFromComment$(commentId: number): Observable<void> {
    const endpoint = `${environment.backendApi}/api/comments/${commentId}/reactions`;
    return this.http.delete<void>(endpoint);
  }

  public addReactionToComment$(userId: number, commentId: number): Observable<Reaction> {
    const endpoint = `${environment.backendApi}/api/comments/reactions`;
    const payload = {
      "commentId": commentId,
      "createdAt": new Date().toISOString(),
      "userId": userId
    };
    return this.http.post<Reaction>(endpoint, payload);
  }

  public getComments$(activityId: string): Observable<PostComment[]> {
    const endpoint = `${environment.backendApi}/api/posts/${activityId}/comments`;
    return this.http.get<PostComment[]>(endpoint).pipe(tap(data => console.log(data)));
  }

  public getReactions$(activityId: string): Observable<Reaction[]> {
    const endpoint = `${environment.backendApi}/api/posts/${activityId}/reactions`;
    return this.http.get<Reaction[]>(endpoint).pipe(tap(data => console.log(data)));
  }

  public addComment$(userId: number, activityId: string, commentText: string): Observable<PostComment> {
    const endpoint = `${environment.backendApi}/api/comments`;
    const comment = {
      "createdAt": new Date().toISOString(),
      "postId": activityId,
      "text": commentText,
      "userId": userId
    };
    return this.http.post<PostComment>(endpoint, comment);
  }

  public getCompletedActivities$(userId: number, currentUserId: number, page = 0): Observable<PostExtended[]> {
    return this.getUserPost$(userId, currentUserId, "ActivityPost", page).pipe(
      map(data => data as PostExtended[]),
      map(data => data.map(a => this.speedFixAdapter.adapt(a))),
      map(data => data.map(p => this.mockedPressureAdapter.adapt(p)))
    );
  }

  public getPlannedRoutes$(userId: number, currentUserId: number, page = 0): Observable<PlannedPostExtended[]> {
    return this.getUserPost$(userId, currentUserId, "PlannedRoutePost", page).pipe(
      map(data => data as PlannedPostExtended[]));
  }

  public getEvents$(userId: number, currentUserId: number, page = 0): Observable<EventPostExtended[]> {
    return this.getUserPost$(userId, currentUserId, "EventPost", page).pipe(
      map(data => data as EventPostExtended[]));
  }

  public getLikedActivities$(userId: number, page = 0): Observable<PostExtended[]> {
    const endpoint = `${environment.backendApi}/api/wall/liked/${userId}?page=${page}&amount=${PostsService.amountPerPage}&extended=true`;
    return this.http.get<ActivityType[]>(endpoint).pipe(
      tap(data => console.log(data)),
      map(data => data as PostExtended[]),
      map(data => data.map(p => this.mockedPressureAdapter.adapt(p)))
    );
  }

  private getUserPost$(userId: number, currentUserId: number, postType: string, page = 0): Observable<ActivityType[]> {
    const endpoint = `${environment.backendApi}/api/users/${userId}/posts?` +
      `extended=true&amount=${PostsService.amountPerPage}&caller-id=${currentUserId}&page=${page}&postTypes=${postType}`;
    return this.http.get<ActivityType[]>(endpoint).pipe(tap(data => console.log(data)));
  }
}
