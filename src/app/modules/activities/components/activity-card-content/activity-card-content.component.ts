import { Component, Input, OnInit } from "@angular/core";
import { ActivityPost } from "@app/core/models";

@Component({
  selector: "app-activity-card-content",
  templateUrl: "./activity-card-content.component.html",
  styleUrls: ["./activity-card-content.component.scss"]
})
export class ActivityCardContentComponent implements OnInit {
  @Input() public activity?: ActivityPost;

  constructor() {
  }

  public ngOnInit(): void {
  }
}
