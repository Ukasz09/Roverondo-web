import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User, UserExtended, UserPlotData, UserStatisticsPeriod } from "@app/core/models";
import { map } from "rxjs/operators";
import { environment } from "@app/env";
import { UserPlotDataAdapterService } from "../adapters";
import { TimeRange } from "@app/core/enums";
import { Utils } from "@app/shared/utils";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  public static readonly registerUserEndpoint = `${environment.backendApi}/api/users/register`;

  constructor(
    private readonly http: HttpClient,
    private readonly userPlotDataAdapter: UserPlotDataAdapterService
  ) {
  }

  public registerUser$(): Observable<User> {
    return this.http.post<User>(UsersService.registerUserEndpoint, {});
  }

  public getUser$(userId: number, extended = false): Observable<User | UserExtended> {
    const endpoint = `${environment.backendApi}/api/users/${userId}?extended=${extended}`;
    return this.http.get<User>(endpoint);
  }

  public getUserByProvider$(providerId: string): Observable<User> {
    const endpoint = `${environment.backendApi}/api/users/providers/${providerId}`;
    return this.http.get<User>(endpoint);
  }

  public getFollowers$(userId: number): Observable<User[]> {
    const endpoint = `${environment.backendApi}/api/users/${userId}/followers`;
    return this.http.get<User[]>(endpoint);
  }

  public getFollowings$(userId: number): Observable<User[]> {
    const endpoint = `${environment.backendApi}/api/users/${userId}/followings`;
    return this.http.get<User[]>(endpoint);
  }

  public followUser$(followedId: number, followerId: number): Observable<void> {
    const endpoint = `${environment.backendApi}/api/users/${followedId}/${followerId}`;
    return this.http.post<void>(endpoint, {});
  }

  public unfollowUser$(followedId: number, followerId: number): Observable<void> {
    const endpoint = `${environment.backendApi}/api/users/${followedId}/${followerId}`;
    return this.http.delete<void>(endpoint);
  }

  public searchUsers$(query: string, amount = 10, offset = 0): Observable<User[]> {
    const endpoint = `${environment.backendApi}/api/users/search/${query}?amount=${amount}&offset=${offset}`;
    return this.http.get<User[]>(endpoint);
  }

  public plotSummarizedData(userId: string | number, plotBatchRange = TimeRange.monthly): Observable<UserPlotData> {
    const from = Utils.addYearToDate(new Date(), -1);
    const fromMonth = (from.getMonth() + 1).toString().padStart(2, "0");
    const fromDay = from.getDate().toString().padStart(2, "0");
    const fromDateFormatted = `${from.getFullYear()}-${fromMonth}-${fromDay}`;

    const to = Utils.addYearToDate(from, 1);
    const toMonth = (to.getMonth() + 1).toString().padStart(2, "0");
    const toDay = to.getDate().toString().padStart(2, "0");
    const toDateFormatted = `${to.getFullYear()}-${toMonth}-${toDay}`;

    const endpoint = `${environment.backendApi}/api/users/${userId}/statisticsOverTime/${fromDateFormatted}/${toDateFormatted}/${plotBatchRange}`;
    return this.http.get<UserStatisticsPeriod[]>(endpoint).pipe(
      map(userStatPeriod => this.userPlotDataAdapter.adapt(userStatPeriod))
    );
  }

  public getUsers$(): Observable<User[]> {
    const endpoint = `${environment.backendApi}/api/users`;
    return this.http.get<User[]>(endpoint);
  }
}
