import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor() {
  }

  public get isMobileLayout(): boolean {
    return true; // TODO: tmp - use services
  }

  public ngOnInit(): void {
  }
}
