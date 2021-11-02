import { Component, Input, OnInit, Output } from "@angular/core";
import { LayoutService } from "@app/core/services";
import { User } from "@app/core/models";
import { LayoutType } from "@app/core/enums";
import { Router } from "@angular/router";
import { AppRoutes } from "@app/routes";
import { UserRoutes } from "../../user-routes";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"]
})
export class UsersListComponent implements OnInit {
  @Input() public userList!: User[];

  constructor(
    private readonly layoutService: LayoutService,
    private readonly router: Router
  ) {
  }

  public ngOnInit(): void {
  }

  public get isMobileLayout(): boolean {
    return this.layoutService.layoutType === LayoutType.ASIDE_MOBILE;
  }

  public onUserClick(user: User): void {
    this.router.navigate([`${AppRoutes.user}/${UserRoutes.profile}/${user.id}`]).then();
  }
}
