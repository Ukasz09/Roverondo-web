import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-glass-btn",
  templateUrl: "./glass-btn.component.html",
  styleUrls: ["./glass-btn.component.scss"]
})
export class GlassBtnComponent implements OnInit {
  @Input() public paddingY = "0.5rem";
  @Input() public borderRadius = "4px";
  @Input() public highlighted = false;
  @Input() public lighter = false;

  constructor() {
  }

  public ngOnInit(): void {
  }
}
