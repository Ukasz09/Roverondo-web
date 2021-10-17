import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-logo-text",
  templateUrl: "./logo-text.component.html",
  styleUrls: ["./logo-text.component.scss"]
})
export class LogoTextComponent implements OnInit {
  @Input()
  public lightText = false;

  constructor() {
  }

  public get themeCssClass(): string {
    return this.lightText ? "light-theme" : "";
  }

  public ngOnInit(): void {
  }
}
