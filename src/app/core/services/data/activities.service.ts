import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MocksUrl } from "@app/core/enums";
import { Observable, of } from "rxjs";
import { PostComment, PostExtended } from "@app/core/models";
import { map, tap } from "rxjs/operators";
import { PlotDataAdapterService } from "../adapters";

@Injectable({
  providedIn: "root"
})
export class ActivitiesService {
  constructor(private readonly http: HttpClient, private readonly plotDataAdapter: PlotDataAdapterService) {
  }

  public getAllActivities$(offset = 0, extended = true, amount = 5): Observable<PostExtended[]> {
    return this.http.get<PostExtended[]>(MocksUrl.allActivities).pipe(tap(data => console.log(data)));
  }

  public getMyActivities$(offset = 0, extended = true, amount = 5): Observable<PostExtended[]> {
    return this.http.get<PostExtended[]>(MocksUrl.allActivities).pipe(
      map(data => data.filter(a => a.user.id == 1)),
      tap(data => console.log(data))
    );
  }

  public getLikedActivities$(offset = 0, extended = true, amount = 5): Observable<PostExtended[]> {
    return this.http.get<PostExtended[]>(MocksUrl.allActivities);
  }

  public likeActivity$(activityId: number): Observable<boolean> {
    return of(true);
  }

  public getComments(activityId: string): Observable<PostComment[]> {
    return this.http.get<PostComment[]>(MocksUrl.postComments);
  }

  public addComment(activityId: string, comment: string): Observable<boolean> {
    return of(true);
  }
}
