import { Component, Inject, OnInit } from "@angular/core";
import { ActivitiesRoutes } from "@app/core/enums";
import { NgxSpinnerService } from "ngx-spinner";
import { CurrentUserService } from "@app/core/services";
import { ActivatedRoute, Router } from "@angular/router";
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from "@angular/material/bottom-sheet";

@Component({
  selector: "app-filter-sheet",
  templateUrl: "./filter-sheet.component.html",
  styleUrls: ["./filter-sheet.component.scss"]
})
export class FilterSheetComponent implements OnInit {
  public activatedRouteType!: ActivitiesRoutes;

  public readonly ActivitiesRoutes = ActivitiesRoutes;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { activatedRouteType: ActivitiesRoutes },
    public readonly activatedRoute: ActivatedRoute,
    private readonly spinner: NgxSpinnerService,
    private readonly currentUserService: CurrentUserService,
    private readonly router: Router,
    private readonly _bottomSheetRef: MatBottomSheetRef<FilterSheetComponent>) {
  }

  public ngOnInit(): void {
    this.activatedRouteType = this.data.activatedRouteType;
  }

  public navigate(type: ActivitiesRoutes): void {
    this.currentUserService.currentUser$.subscribe((user) => {
      if (this.activatedRouteType !== type) {
        if (user) {
          const link = `/activities/${user.id}/wall/${type}`;
          this.router.navigate([link]).then();
        } else {
          console.error("User not found - not navigate");
        }
      }
      this._bottomSheetRef.dismiss();
    });
  }
}
