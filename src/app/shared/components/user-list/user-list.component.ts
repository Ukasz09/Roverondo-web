import { Component, Input, OnInit } from "@angular/core";
import { User } from "@app/core/models";
import { AppRoutes, LayoutType } from "@app/core/enums";
import { LayoutService } from "@app/core/services";
import { Utils } from "@app/shared/utils";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit {
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

  public rankMedalImg(index: number): string | undefined {
    return this.rankMedals[index];
  }
}
