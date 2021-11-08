import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { User } from "@app/core/models";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private readonly http: HttpClient) {
  }

  public registerUser$(): Observable<User> {
    const endpoint = `api/users/register`;
    return this.http.post<User>(endpoint, {});
  }

  public getUsers$(): Observable<User[]> {
    const endpoint = `api/users`;
    return this.http.get<User[]>(endpoint).pipe(tap(data => console.log(data)));
  }

  public getUser$(userId: number): Observable<User> {
    const endpoint = `api/users/${userId}`;
    return this.http.get<User>(endpoint).pipe(tap(data => console.log(data)));
  }

  public getUserByProvider$(providerId: string): Observable<User> {
    const endpoint = `api/users/providers/${providerId}`;
    return this.http.get<User>(endpoint).pipe(tap(data => console.log(data)));
  }

  public getFollowers$(userId: number): Observable<User[]> {
    const endpoint = `api/users/${userId}/followers`;
    return this.http.get<User[]>(endpoint).pipe(tap(data => console.log(data)));
  }

  public getFollowing$(userId: number): Observable<User[]> {
    const endpoint = `api/users/${userId}/followings`;
    return this.http.get<User[]>(endpoint).pipe(tap(data => console.log(data)));
  }

  public getUsersLeaderboard$(): Observable<User[]> {
    // const endpoint = `api/users/leaderboard`;
    // return this.http.get<User[]>(endpoint).pipe(tap(data => console.log(data)));

    // TODO: tmp mocked
    return this.getUsers$();
  }
}
