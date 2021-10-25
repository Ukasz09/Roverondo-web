import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MocksUrl } from "@app/core/enums";
import { Observable } from "rxjs";
import { ActivityPost } from "@app/core/models";
import { delay, filter, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ActivitiesService {
  constructor(private readonly http: HttpClient) {
  }

  public getAllActivities(): Observable<ActivityPost[]> {
    return this.http.get<ActivityPost[]>(MocksUrl.allActivities).pipe(tap(data => console.log(data)));
  }

  public getMyActivities(): Observable<ActivityPost[]> {
    return this.http.get<ActivityPost[]>(MocksUrl.allActivities).pipe(
      map(data => data.filter(a => a.user.id === "1")),
      tap(data => console.log(data))
    );
  }

  public getLikedActivities(): Observable<ActivityPost[]> {
    return this.http.get<ActivityPost[]>(MocksUrl.allActivities).pipe(
      map(data => data.filter(a => !!a.reactions.find(r => r.userId === "1"))),
      tap(data => console.log(data))
    );
  }

  public likeActivity(activityId: string): Observable<ActivityPost> {
    // TODO: mocked
    return this.http.get<ActivityPost[]>(MocksUrl.allActivities).pipe(map(posts => {
      const reaction = {
        userId: "1",
        addedAt: new Date().toJSON(),
        emoji: "❤"
      };
      posts[0].reactions.push(reaction);
      return posts[0];
    }));
  }
}
