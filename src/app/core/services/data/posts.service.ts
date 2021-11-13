import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@app/env";
import { PostComment, Reaction } from "@app/core/models";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PostsService {
  constructor(private readonly http: HttpClient) {
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
}
