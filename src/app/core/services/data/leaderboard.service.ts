import { Injectable } from "@angular/core";
import { forkJoin, Observable, zip } from "rxjs";
import { User, UserExtended } from "@app/core/models";
import { environment } from "@app/env";
import { HttpClient } from "@angular/common/http";
import { UsersService } from "./users.service";
import { switchMap, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class LeaderboardService {
  constructor(private readonly http: HttpClient, private readonly userService: UsersService) {
  }

  public getUsersLeaderboard$(): Observable<UserExtended[]> {
    return this.userService.getUsers$().pipe(
      switchMap(users => {
        const usersExtended$ = users.map(u => this.userService.getUser$(u.id, true) as Observable<UserExtended>);
        return forkJoin(usersExtended$);
      })
    );
  }
}
