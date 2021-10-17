import { Component, OnInit } from "@angular/core";
import { LayoutService } from "@app/core/services";
import { LayoutTypeEnum } from "@app/core/enums";
import { Routes } from "@app/routes";

@Component({
  selector: "app-activities-wall",
  templateUrl: "./activities-wall.component.html",
  styleUrls: ["./activities-wall.component.scss"]
})
export class ActivitiesWallComponent implements OnInit {
  public readonly AppRoutes = Routes;
  public activities = [1, 2, 3, 4]; // TODO: mocked

  constructor(private readonly layoutService: LayoutService) {
  }

  public get isMobileLayout(): boolean {
    return this.layoutService.layoutType === LayoutTypeEnum.ASIDE_MOBILE;
  }

  public ngOnInit(): void {
  }
}
