import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { User } from "@app/core/models";
import { Observable } from "rxjs";
import { AuthService } from "@auth0/auth0-angular";
import { AppRoutes } from "@app/routes";
import { UserService } from "@app/core/services";

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
    private readonly userService: UserService
  ) {
  }

  public ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: (data: Data) => {
        if (!data.user) {
          this.fetchCurrentUserData();
        }
        this.user = data.user;
      }
    });
  }

  private fetchCurrentUserData(): void {
    this.authService.user$.subscribe((user) => {
      const currentUser = user as any;
      if (!currentUser) {
        this.router.navigate([AppRoutes.home]).then();
        return;
      }
      this.userService.getUser$(currentUser.sub).subscribe({
        next: user => {
          this.user = user;
        }
      });
    });
  }
}
