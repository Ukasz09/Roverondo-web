import { Component, HostListener, OnInit } from "@angular/core";
import { Constants } from "@app/core/constants";

@Component({
  selector: "app-aside-layout",
  templateUrl: "./aside-layout.component.html",
  styleUrls: ["./aside-layout.component.scss"]
})
export class AsideLayoutComponent implements OnInit {
  public isMobileLayout = false;
  public drawerIsOpen = false;

  public ngOnInit(): void {
    this.updateLayoutType(window.innerWidth);
  }

  public onDrawerOpenStart(): void {
    this.drawerIsOpen = true;
  }

  public onDrawerCloseStart(): void {
    this.drawerIsOpen = false;
  }

  @HostListener("window:resize", ["$event"])
  private onResize(event: any) {
    this.updateLayoutType(event.target.innerWidth);
  }

  private updateLayoutType(width: number): void {
    this.isMobileLayout = width < Constants.pcResolutionThresholdPx;
    if (!this.isMobileLayout) {
      this.drawerIsOpen = false;
    }
  }
}
