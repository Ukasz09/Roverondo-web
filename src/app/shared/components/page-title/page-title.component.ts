import { Component, Input, OnInit } from "@angular/core";
import { AppRoutes } from "@app/core/enums";
import { User } from "@app/core/models";

@Component({
  selector: "app-page-title",
  templateUrl: "./page-title.component.html",
  styleUrls: ["./page-title.component.scss"]
})
export class PageTitleComponent implements OnInit {
  @Input() user!: User;
  @Input() headerText!: string;

  constructor() {
  }

  public ngOnInit(): void {
  }

  public get homeRouterLink(): string {
    return `/${AppRoutes.home}`;
  }
}
