import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-scroll-container",
  templateUrl: "./scroll-container.component.html",
  styleUrls: ["./scroll-container.component.scss"]
})
export class ScrollContainerComponent implements OnInit {
  @Input()
  public withScrollbar = true;

  constructor() {
  }

  public ngOnInit(): void {
  }

}
