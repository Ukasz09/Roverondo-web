import { Component, OnInit } from "@angular/core";
import { CurrentUserService, UsersService } from "@app/core/services";
import { Router } from "@angular/router";
import { AppRoutes } from "@app/core/enums";

@Component({
  template: ``,
  selector: "app-sign-in-callback"
})
export class SignInCallbackComponent implements OnInit {
  constructor(
    private readonly userService: UsersService,
    private readonly router: Router,
    private readonly currentUserService: CurrentUserService
  ) {
  }

  public ngOnInit(): void {
    this.userService.registerUser$().subscribe((user) => {
      this.currentUserService.setCurrentUser(user);
      this.router.navigate([AppRoutes.home]).then(() => {
      });
    });

    this.currentUserService.fetchCurrentUser();
  }
}
