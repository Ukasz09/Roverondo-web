import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MocksUrl } from "@app/core/enums";
import { Observable } from "rxjs";
import { User } from "@app/core/models";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CurrentUserService {
  // TODO: Temporary mocked
  private user?: User;

  constructor(private readonly http: HttpClient) {
    this.fetchCurrentUser().subscribe({
      next: user => this.user = user
    });
  }

  public get currentUser(): User | undefined {
    return this.user;
  }

  private fetchCurrentUser(): Observable<User> {
    return this.http.get<User>(MocksUrl.currentUser).pipe(tap(data => console.log(data)));
  }
}
