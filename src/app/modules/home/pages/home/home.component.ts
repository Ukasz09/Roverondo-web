import { Component, OnInit } from "@angular/core";
import { LayoutService } from "@app/core/services";
import { LayoutTypeEnum } from "@app/core/enums";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public readonly LayoutTypeEnum = LayoutTypeEnum;

  constructor(public readonly layoutService: LayoutService) {
  }

  public ngOnInit(): void {
  }
}
