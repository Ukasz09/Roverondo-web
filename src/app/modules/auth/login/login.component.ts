import { Component, OnInit } from "@angular/core";
import { Icons, Utils } from "@app/shared/utils";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public iconsClassRef = Icons;

  constructor() {
  }

  public ngOnInit(): void {
  }

  public getIconPath(iconName: string): string {
    return Utils.getIconPath(iconName);
  }
}
