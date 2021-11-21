import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { User, UserExtended, UserPlotData, UserStatisticsPeriod } from "@app/core/models";
import { map, switchMap, tap } from "rxjs/operators";
import { environment } from "@app/env";
import { UserAllTimeStatisticsAdapterService, UserPlotDataAdapterService } from "../adapters";
import { TimeRange } from "@app/core/enums";
import { Utils } from "@app/shared/utils";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(
    private readonly http: HttpClient,
    private readonly userAllTimeStatisticsAdapter: UserAllTimeStatisticsAdapterService,
    private readonly userPlotDataAdapter: UserPlotDataAdapterService
  ) {
  }

  public registerUser$(): Observable<User> {
    const endpoint = `${environment.backendApi}/api/users/register`;
    return this.http.post<User>(endpoint, {});
  }

  public getUsers$(): Observable<User[]> {
    const endpoint = `${environment.backendApi}/api/users`;
    return this.http.get<User[]>(endpoint).pipe(tap(data => console.log(data)));
  }

  public getUser$(userId: number, extended = false): Observable<User | UserExtended> {
    const endpoint = `${environment.backendApi}/api/users/${userId}?extended=${extended}`;
    return this.http.get<User>(endpoint).pipe(
      // map(u => extended ? this.userAllTimeStatisticsAdapter.adapt(u) : u),
      tap(data => console.log(data)));
  }

  public getUserByProvider$(providerId: string): Observable<User> {
    const endpoint = `${environment.backendApi}/api/users/providers/${providerId}`;
    return this.http.get<User>(endpoint).pipe(tap(data => console.log(data)));
  }

  public getFollowers$(userId: number): Observable<User[]> {
    const endpoint = `${environment.backendApi}/api/users/${userId}/followers`;
    return this.http.get<User[]>(endpoint).pipe(tap(data => console.log(data)));
  }

  public getFollowings$(userId: number): Observable<User[]> {
    const endpoint = `${environment.backendApi}/api/users/${userId}/followings`;
    return this.http.get<User[]>(endpoint).pipe(tap(data => console.log(data)));
  }

  public followUser$(followedId: number, followerId:number): Observable<void> {
    const endpoint = `${environment.backendApi}/api/users/${followedId}/${followerId}`;
    return this.http.post<void>(endpoint, {});
  }

  public unfollowUser$(followedId: number, followerId:number): Observable<void> {
    const endpoint = `${environment.backendApi}/api/users/${followedId}/${followerId}`;
    return this.http.delete<void>(endpoint);
  }

  public searchUsers$(query: string, amount = 10, offset = 0): Observable<User[]> {
    const endpoint = `${environment.backendApi}/api/users/search/${query}?amount=${amount}&offset=${offset}`;
    return this.http.get<User[]>(endpoint).pipe(tap(data => console.log(data)));
  }

  public plotSummarizedData(userId: string | number, plotBatchRange = TimeRange.monthly): Observable<UserPlotData> {
    const from = Utils.addYearToDate(new Date(), -1);
    const fromFormatted = `${from.getFullYear()}-${from.getMonth() + 1}-${from.getDate()}`;
    const to = Utils.addYearToDate(from, 1);
    const toFormatted = `${to.getFullYear()}-${to.getMonth() + 1}-${to.getDate()}`;
    const endpoint = `${environment.backendApi}/api/users/${userId}/statisticsOverTime/${fromFormatted}/${toFormatted}/${plotBatchRange}`;
    return this.http.get<UserStatisticsPeriod[]>(endpoint).pipe(
      map(userStatPeriod => this.userPlotDataAdapter.adapt(userStatPeriod)),
      tap(data => console.log(data))
    );

    // const mockedDataList = this.userPlotDataAdapter.getMockedDataList(plotBatchRange);
    // return of(mockedDataList).pipe(
    //   tap(d => console.log(d)),
    //   map(userStatPeriod => this.userPlotDataAdapter.adapt(userStatPeriod))
    // );
  }
}
