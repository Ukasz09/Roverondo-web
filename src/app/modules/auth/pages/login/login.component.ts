import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Icons } from "@app/core/enums";
import { Utils } from "@app/shared/utils";
import { Routes } from "@app/routes";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public readonly Icons = Icons;

  constructor(private readonly router: Router) {
  }

  public ngOnInit(): void {
  }

  public getIconPath(iconName: string): string {
    return Utils.getIconPath(iconName);
  }

  public onFacebookSignInClick(): void {
    //TODO: tmp mocked - add logic
    this.navigateToHome();
  }

  public onGoogleSignInClick(): void {
    //TODO: tmp mocked - add logic
    this.navigateToHome();
  }

  public onGithubSignInClick(): void {
    //TODO: tmp mocked - add logic
    this.navigateToHome();
  }

  private navigateToHome(): void {
    this.router.navigateByUrl(Routes.home).then(_ => {
    });
  }
}
