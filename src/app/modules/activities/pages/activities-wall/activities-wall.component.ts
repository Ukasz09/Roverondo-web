import { Component, OnInit } from "@angular/core";
import { LayoutService } from "@app/core/services";
import { LayoutType } from "@app/core/enums";
import { AppRoutes } from "@app/routes";
import { ActivatedRoute } from "@angular/router";
import { ActivityPost } from "@app/core/models";

@Component({
  selector: "app-activities-wall",
  templateUrl: "./activities-wall.component.html",
  styleUrls: ["./activities-wall.component.scss"]
})
export class ActivitiesWallComponent implements OnInit {
  public readonly AppRoutes = AppRoutes;
  public activities: ActivityPost[] = [];

  constructor(private readonly layoutService: LayoutService, private readonly activatedRoute: ActivatedRoute) {
  }

  public get isMobileLayout(): boolean {
    return this.layoutService.layoutType === LayoutType.ASIDE_MOBILE;
  }

  public ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: (data) => {
        this.activities = data.activities as ActivityPost[];
      }
    });
  }
}
