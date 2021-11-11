import { Component, Input, OnInit } from "@angular/core";
import { User } from "@app/core/models";
import { AppRoutes } from "@app/routes";
import { LayoutType } from "@app/core/enums";
import { LayoutService } from "@app/core/services";
import { Utils } from "@app/shared/utils";

@Component({
  selector: "app-user-list-page",
  templateUrl: "./user-list-page.component.html",
  styleUrls: ["./user-list-page.component.scss"]
})
export class UserListPageComponent implements OnInit {
  @Input() public userList?: User[] = [];
  @Input() public withRankMedals = false;

  public readonly AppRoutes = AppRoutes;

  private readonly rankMedals: Record<number, string> = {
    0: Utils.getIconPath("medal-1.png"),
    1: Utils.getIconPath("medal-2.png"),
    2: Utils.getIconPath("medal-3.png")
  };

  constructor(private readonly layoutService: LayoutService) {
  }

  public ngOnInit(): void {
  }

  public get isMobileLayout(): boolean {
    return this.layoutService.layoutType === LayoutType.ASIDE_MOBILE;
  }

  public get homeRouterLink(): string {
    return `/${AppRoutes.home}`;
  }

  public rankMedalImg(index: number): string | undefined {
    return this.rankMedals[index];
  }
}
