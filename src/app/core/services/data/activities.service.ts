import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MocksUrl } from "@app/core/enums";
import { Observable, of } from "rxjs";
import { ActivityPost, ActivityPostDetails, PostComment } from "@app/core/models";
import { map, tap } from "rxjs/operators";
import { PlotDataAdapterService } from "../adapters";

@Injectable({
  providedIn: "root"
})
export class ActivitiesService {
  constructor(private readonly http: HttpClient, private readonly plotDataAdapter: PlotDataAdapterService) {
  }

  public getAllActivities$(offset = 0, extended = true, amount = 5): Observable<ActivityPost[]> {
    return this.http.get<ActivityPost[]>(MocksUrl.allActivities).pipe(tap(data => console.log(data)));
  }

  public getMyActivities$(offset = 0, extended = true, amount = 5): Observable<ActivityPost[]> {
    return this.http.get<ActivityPost[]>(MocksUrl.allActivities).pipe(
      map(data => data.filter(a => a.user.id == 1)),
      tap(data => console.log(data))
    );
  }

  public getLikedActivities$(offset = 0, extended = true, amount = 5): Observable<ActivityPost[]> {
    return this.http.get<ActivityPost[]>(MocksUrl.allActivities).pipe(
      map(data => data.filter(a => !!a.reactions.find(r => r.userId === "github|44710226"))),
      tap(data => console.log(data))
    );
  }

  public likeActivity$(activityId: string): Observable<boolean> {
    return of(true);
  }

  public getActivityDetails(activityId: string): Observable<ActivityPostDetails> {
    return this.http.get<ActivityPostDetails>(MocksUrl.activityDetails).pipe(map(post => this.plotDataAdapter.adapt(post)));
  }

  public getComments(activityId: string): Observable<PostComment[]> {
    return this.http.get<PostComment[]>(MocksUrl.postComments);
  }

  public addComment(activityId: string, comment: string): Observable<boolean> {
    return of(true);
  }
}
