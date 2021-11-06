import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PostComment, PostExtended } from "@app/core/models";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ActivitiesService {
  // TODO: cleanup - user object instead of params

  constructor(private readonly http: HttpClient) {
  }

  public getAllActivities$(userId: number, offset = 0, type = "ActivityPost", extended = true, amount = 5): Observable<PostExtended[]> {
    const endpoint = `api/wall/${userId}?offset=${offset}&amount=${amount}&postTypes=${type}&extended=${extended}`;
    return this.http.get<PostExtended[]>(endpoint).pipe(tap(data => console.log(data)));
  }

  public getMyActivities$(userId: number, offset = 0, type = "ActivityPost", extended = true, amount = 5): Observable<PostExtended[]> {
    // TODO: integrate with backend
    const endpoint = `api/wall/${userId}?offset=${offset}&amount=${amount}&postTypes=${type}&extended=${extended}`;
    return this.http.get<PostExtended[]>(endpoint).pipe(tap(data => console.log(data)));
  }

  public getLikedActivities$(userId: number, offset = 0, type = "ActivityPost", extended = true, amount = 5): Observable<PostExtended[]> {
    // TODO: integrate with backend
    const endpoint = `api/wall/${userId}?offset=${offset}&amount=${amount}&postTypes=${type}&extended=${extended}`;
    return this.http.get<PostExtended[]>(endpoint).pipe(tap(data => console.log(data)));
  }

  public likeActivity$(userId: number, activityId: number): Observable<void> {
    const endpoint = "api/posts/react";
    const reaction = {
      "createdAt": new Date().toISOString(),
      "postId": activityId,
      "userId": userId
    };
    return this.http.post<void>(endpoint, reaction);
  }

  public getComments(activityId: string): Observable<PostComment[]> {
    const endpoint = `api/posts/${activityId}/comments`;
    return this.http.get<PostComment[]>(endpoint).pipe(tap(data => console.log(data)));
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
