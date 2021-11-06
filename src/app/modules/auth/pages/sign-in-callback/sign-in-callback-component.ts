import { Component, OnInit } from "@angular/core";
import { UsersService } from "@app/core/services";
import { Router } from "@angular/router";
import { AppRoutes } from "@app/routes";

@Component({
  template: ``,
  selector: "app-sign-in-callback"
})
export class SignInCallbackComponent implements OnInit {
  constructor(private readonly userService: UsersService, private readonly router: Router) {
  }

  public ngOnInit(): void {
    this.userService.registerUser$().subscribe(() => {
      console.log("User registered");
      this.router.navigate([AppRoutes.home]).then(() => {
      });
    });
  }
}
