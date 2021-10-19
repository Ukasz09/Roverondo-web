import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MocksUrl } from "@app/core/enums";
import { Observable } from "rxjs";
import { ActivityPost } from "@app/core/models";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ActivitiesService {

  constructor(private readonly http: HttpClient) {
  }

  public getAllActivities(): Observable<ActivityPost[]> {
    return this.http.get<ActivityPost[]>(MocksUrl.all_activities).pipe(tap(data => console.log(data)));
  }

  public getMyActivities(): Observable<ActivityPost[]> {
    return this.http.get<ActivityPost[]>(MocksUrl.my_activities).pipe(tap(data => console.log(data)));
  }

  public getLikedActivities(): Observable<ActivityPost[]> {
    return this.http.get<ActivityPost[]>(MocksUrl.liked_activities).pipe(tap(data => console.log(data)));
  }
}
