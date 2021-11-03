import { Component, Input, OnInit } from "@angular/core";
import { User } from "@app/core/models";
import { AppRoutes } from "@app/routes";
import { LayoutType } from "@app/core/enums";
import { LayoutService } from "@app/core/services";

@Component({
  selector: "app-follow-page",
  templateUrl: "./follow-page.component.html",
  styleUrls: ["./follow-page.component.scss"]
})
export class FollowPageComponent implements OnInit {
  @Input() public users?: User[];

  public readonly AppRoutes = AppRoutes;

  constructor(private readonly layoutService: LayoutService) {
  }

  public ngOnInit(): void {
  }

  public get isMobileLayout(): boolean {
    return this.layoutService.layoutType === LayoutType.ASIDE_MOBILE;
  }
}
