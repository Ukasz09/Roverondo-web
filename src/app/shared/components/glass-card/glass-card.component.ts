import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-glass-card",
  templateUrl: "./glass-card.component.html",
  styleUrls: ["./glass-card.component.scss"]
})
export class GlassCardComponent implements OnInit {
  @Input() public headerText: string = "";
  @Input() public borderRadius = "25px";
  @Input() public lighter = true;

  constructor() {
  }

  public ngOnInit(): void {
  }
}
