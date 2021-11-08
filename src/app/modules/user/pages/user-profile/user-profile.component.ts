import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { User } from "@app/core/models";
import { AuthService } from "@auth0/auth0-angular";
import { CurrentUserService, UsersService } from "@app/core/services";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"]
})
export class UserProfileComponent implements OnInit {
  private user?: User;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly userService: UsersService,
    private readonly currentUserService: CurrentUserService
  ) {
  }

  public ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: Data) => {
      if (!data.user) {
        this.currentUserService.currentUser$.subscribe(user => {
          this.user = user;
        });
      }
      this.user = data.user;
    });
  }

  public userStringify(): string {
    return JSON.stringify(this.user);
  }
}
