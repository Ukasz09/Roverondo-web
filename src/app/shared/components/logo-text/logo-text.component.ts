import { Component, Input, OnInit } from "@angular/core";
import { environment } from "@app/env";

@Component({
  selector: "app-logo-text",
  templateUrl: "./logo-text.component.html",
  styleUrls: ["./logo-text.component.scss"]
})
export class LogoTextComponent implements OnInit {
  @Input() public lightText = false;
  @Input() public withVersion = false;

  constructor() {
  }

  public get themeCssClass(): Record<string, boolean> {
    return {
      "light-theme": this.lightText,
      "with-version": this.withVersion
    };
  }

  public ngOnInit(): void {
  }

  public get version(): string {
    return environment.version;
  }
}
