import { Component, Input, OnInit } from "@angular/core";
import { TimeRange } from "@app/core/enums";

@Component({
  selector: "app-time-range-btn-toggle",
  templateUrl: "./time-range-btn-toggle.component.html",
  styleUrls: ["./time-range-btn-toggle.component.scss"]
})
export class TimeRangeBtnToggleComponent implements OnInit {
  @Input() public activeTimeRange = TimeRange.monthly;

  public readonly TimeRange = TimeRange;

  constructor() {
  }

  public ngOnInit(): void {
  }
}
