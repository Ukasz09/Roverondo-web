import { Component, OnInit } from "@angular/core";
import { LayoutService } from "@app/core/services";
import { LayoutType } from "@app/core/enums";
import { AuthService } from "@auth0/auth0-angular";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public readonly LayoutTypeEnum = LayoutType;

  constructor(public readonly layoutService: LayoutService, public readonly auth: AuthService, private readonly spinner: NgxSpinnerService) {
  }

  public ngOnInit(): void {
    this.spinner.show().then(_ => {
    });
  }
}
