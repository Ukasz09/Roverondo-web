import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TimeRange } from "@app/core/enums";

@Component({
  selector: "app-time-range-btn-toggle",
  templateUrl: "./time-range-btn-toggle.component.html",
  styleUrls: ["./time-range-btn-toggle.component.scss"]
})
export class TimeRangeBtnToggleComponent implements OnInit {
  @Input() public activeTimeRange = TimeRange.monthly;

  @Output() public weeklyBtnClick = new EventEmitter<void>();
  @Output() public monthlyBtnClick = new EventEmitter<void>();

  public readonly TimeRange = TimeRange;

  constructor() {
  }

  public ngOnInit(): void {
  }
}
