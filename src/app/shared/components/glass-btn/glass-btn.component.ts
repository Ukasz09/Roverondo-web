import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-glass-btn",
  templateUrl: "./glass-btn.component.html",
  styleUrls: ["./glass-btn.component.scss"]
})
export class GlassBtnComponent implements OnInit {
  @Input() paddingY = "0.5rem";

  constructor() {
  }

  public ngOnInit(): void {
  }
}
