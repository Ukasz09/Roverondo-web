import { Component, Input, OnInit } from "@angular/core";
import { User } from "@app/core/models";

@Component({
  selector: "app-follow-page",
  templateUrl: "./follow-page.component.html",
  styleUrls: ["./follow-page.component.scss"]
})
export class FollowPageComponent implements OnInit {
  @Input() public users?: User[];

  constructor() {
  }

  public ngOnInit(): void {
  }
}
