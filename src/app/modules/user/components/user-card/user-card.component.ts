import { Component, Input, OnInit, Output } from "@angular/core";
import { LayoutService } from "@app/core/services";
import { User } from "@app/core/models";
import { Router } from "@angular/router";
import { AppRoutes } from "@app/routes";
import { UserRoutes } from "../../user-routes";

@Component({
  selector: "app-user-card",
  templateUrl: "./user-card.component.html",
  styleUrls: ["./user-card.component.scss"]
})
export class UsersCardComponent implements OnInit {
  @Input() public user!: User;

  constructor(
    private readonly layoutService: LayoutService,
    private readonly router: Router
  ) {
  }

  public ngOnInit(): void {
  }

  public onUserClick(user: User): void {
    this.router.navigate([`${AppRoutes.user}/${UserRoutes.profile}/${user.id}`]).then();
  }
}
