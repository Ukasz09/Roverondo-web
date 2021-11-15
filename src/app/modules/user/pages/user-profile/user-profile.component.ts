import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data } from "@angular/router";
import { User } from "@app/core/models";
import { SpinnerType } from "@app/core/enums";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"]
})
export class UserProfileComponent implements OnInit {
  public user!: User;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly spinner: NgxSpinnerService
  ) {
  }

  public ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: Data) => {
      this.user = data.user;
      this.spinner.hide(SpinnerType.main).then();
    });
  }

}
