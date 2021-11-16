import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { User, UserExtended, UserPlotData } from "@app/core/models";
import { delay, map, tap } from "rxjs/operators";
import { environment } from "@app/env";
import { UserAllTimeStatisticsAdapterService, UserPlotDataAdapterService } from "../adapters";

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
      map(u => extended ? this.userAllTimeStatisticsAdapter.adapt(u) : u),
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

  public getFollowing$(userId: number): Observable<User[]> {
    const endpoint = `${environment.backendApi}/api/users/${userId}/followings`;
    return this.http.get<User[]>(endpoint).pipe(tap(data => console.log(data)));
  }

  public searchUsers$(query: string, amount = 10, offset = 0): Observable<User[]> {
    const endpoint = `${environment.backendApi}/api/users/search/${query}?amount=${amount}&offset=${offset}`;
    return this.http.get<User[]>(endpoint).pipe(tap(data => console.log(data)));
  }

  public plotSummarizedData(userId: string | number): Observable<UserPlotData> {
    // const endpoint = `${environment.backendApi}/api/users/${userId}/summarizedPlotData`;
    // return this.http.get<UserPlotData[]>(endpoint).pipe(tap(data => console.log(data)));

    // TODO: tmp mocked
    const mockedDataList = this.userPlotDataAdapter.getMockedDataList();
    return of(mockedDataList).pipe(
      map(userStatPeriod => this.userPlotDataAdapter.adapt(userStatPeriod)),
      tap(d => console.log(d)),
    );
  }
}
