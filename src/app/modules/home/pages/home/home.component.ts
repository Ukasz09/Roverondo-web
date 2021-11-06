import { Component, OnInit } from "@angular/core";
import { LayoutService, UsersService } from "@app/core/services";
import { LayoutType } from "@app/core/enums";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public readonly LayoutTypeEnum = LayoutType;

  constructor(public readonly layoutService: LayoutService, private readonly userService: UsersService) {
  }

  public ngOnInit(): void {
  }
}
