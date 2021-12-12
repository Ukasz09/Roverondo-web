import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { AppRoutes, SpinnerType } from "@app/core/enums";
import { Router } from "@angular/router";

@Component({
  selector: "app-page-not-found",
  template: ""
})
export class PageNotFoundComponent implements OnInit {

  constructor(private readonly spinner: NgxSpinnerService, private readonly router: Router) {
  }

  public ngOnInit(): void {
    this.router.navigate([`/${AppRoutes.home}`]).then();
  }
}
