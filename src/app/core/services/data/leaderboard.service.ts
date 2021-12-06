import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "@app/core/models";
import { environment } from "@app/env";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class LeaderboardService {
  constructor(private readonly http: HttpClient) {
  }

  public getUsersLeaderboard$(): Observable<User[]> {
    // TODO: Mocked
    const endpoint = `${environment.backendApi}/api/users`;
    return this.http.get<User[]>(endpoint);
  }
}
