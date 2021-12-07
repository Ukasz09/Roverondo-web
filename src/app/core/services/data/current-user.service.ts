import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Subscription, throwError, zip } from "rxjs";
import { User } from "@app/core/models";
import { UsersService } from "./users.service";
import { AuthService } from "@auth0/auth0-angular";
import { switchMap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CurrentUserService {
  private currentUserSubject$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  private currentUserSubscription$?: Subscription;

  constructor(
    private readonly http: HttpClient,
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {
  }

  public fetchCurrentUser(): void {
    this.currentUserSubscription$ = this.authService.isAuthenticated$.pipe(
      switchMap((authenticated) => {
        if (authenticated) {
          return this.usersService.registerUser$();
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
