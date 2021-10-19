import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MocksUrl } from "@app/core/enums";

@Injectable({
  providedIn: "root"
})
export class ActivitiesService {

  constructor(private readonly http: HttpClient) {
  }

  public getAllActivities() {
    this.http.get(MocksUrl.all_activities);
  }
}
