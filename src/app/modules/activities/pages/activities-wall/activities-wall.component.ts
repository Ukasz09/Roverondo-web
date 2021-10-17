import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-activities-wall",
  templateUrl: "./activities-wall.component.html",
  styleUrls: ["./activities-wall.component.scss"]
})
export class ActivitiesWallComponent implements OnInit {
  public activities = [1, 2, 3, 4]; // TODO: mocked

  constructor() {
  }

  public ngOnInit(): void {
  }

}
