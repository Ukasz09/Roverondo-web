import { Component, HostListener, OnInit } from "@angular/core";
import { LayoutTypeEnum } from "@app/core/enums";
import { LayoutService } from "@app/core/services";

@Component({
  selector: "app-aside-layout",
  templateUrl: "./aside-layout.component.html",
  styleUrls: ["./aside-layout.component.scss"]
})
export class AsideLayoutComponent implements OnInit {
  public readonly LayoutTypeEnum = LayoutTypeEnum;

  constructor(public readonly layoutService: LayoutService) {
  }

  public ngOnInit(): void {
    this.layoutService.setAsideLayoutType(window.innerWidth);
  }

  public onDrawerOpenStart(): void {
    this.layoutService.drawerIsOpen = true;
  }

  public onDrawerCloseStart(): void {
    this.layoutService.drawerIsOpen = false;
  }

  @HostListener("window:resize", ["$event"])
  private onResize(event: any) {
    this.layoutService.setAsideLayoutType(event.target.innerWidth);
  }
}
