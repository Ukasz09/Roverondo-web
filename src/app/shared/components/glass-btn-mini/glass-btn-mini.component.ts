import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-glass-btn-mini",
  templateUrl: "./glass-btn-mini.component.html",
  styleUrls: ["./glass-btn-mini.component.scss"]
})
export class GlassBtnMiniComponent implements OnInit {
  @Input() size= "35px";

  constructor() {
  }

  ngOnInit(): void {
  }

}
