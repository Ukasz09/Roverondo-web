import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "@app/core/models";
import { MocksUrl } from "@app/core/enums";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private readonly http: HttpClient) {
  }

  public getUser$(userId: string): Observable<User> {
    return this.http.get<User>(MocksUrl.user);
  }

  public getFollowers$(userId: string): Observable<User[]> {
    return this.http.get<User[]>(MocksUrl.users);
  }
}
