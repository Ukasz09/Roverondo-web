import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ActivitiesService {

  constructor(private readonly http: HttpClient) {
  }

  public getAllActivities(){
    of()
  }
}
