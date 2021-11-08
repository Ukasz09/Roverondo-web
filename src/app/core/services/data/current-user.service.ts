import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, throwError, zip } from "rxjs";
import { User } from "@app/core/models";
import { UsersService } from "./users.service";
import { AuthService } from "@auth0/auth0-angular";
import { switchMap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CurrentUserService {
  private currentUserSubject$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);

  constructor(
    private readonly http: HttpClient,
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {
  }

  public fetchCurrentUser(): void {
    zip(
      this.authService.isAuthenticated$,
      this.authService.user$
    ).pipe(
      switchMap(([authenticated, providerUser]) => {
        if (authenticated) {
          const userId = providerUser?.sub as string;
          return this.usersService.getUserByProvider$(userId);
        } else return throwError("User not authenticated");
      })
    ).subscribe((user) => this.currentUserSubject$.next(user));
  }

  public get currentUser$() {
    return this.currentUserSubject$.asObservable();
  }

  public setCurrentUser(user: User) {
    this.currentUserSubject$.next(user);
  }
}
