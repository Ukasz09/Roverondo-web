import { Component, HostListener, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public drawerIsOpen = false;
  public mobileMenuIsVisible = true;

  private pcResolutionThreshold = 960;
  // private pcResolutionThreshold = 720;

  constructor() {
  }

  ngOnInit(): void {
    this.updateMobileMenuVisibility(window.innerWidth);
  }

  public onDrawerOpenStart(): void {
    this.drawerIsOpen = true;
  }

  public onDrawerCloseStart(): void {
    this.drawerIsOpen = false;
  }

  @HostListener("window:resize", ["$event"])
  private onResize(event: any) {
    this.updateMobileMenuVisibility(event.target.innerWidth);
  }

  private updateMobileMenuVisibility(width: number): void {
    this.mobileMenuIsVisible = width < this.pcResolutionThreshold;
    if (!this.mobileMenuIsVisible) {
      this.drawerIsOpen = false;
    }
  }
}
