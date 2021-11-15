import { Component, HostListener, Input, OnInit } from "@angular/core";
import { LayoutType } from "@app/core/enums";
import { LayoutService } from "@app/core/services";
import { MatDrawer } from "@angular/material/sidenav";

@Component({
  selector: "app-aside-layout",
  templateUrl: "./aside-layout.component.html",
  styleUrls: ["./aside-layout.component.scss"]
})
export class AsideLayoutComponent implements OnInit {
  @Input() public withAvatar = true;

  public readonly LayoutTypeEnum = LayoutType;

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

  public closeDrawer(drawer: MatDrawer): void {
    this.layoutService.drawerIsOpen = false;
    drawer.close().then(() => {
    });
  }

  public get avatarVisible(): boolean {
    return this.withAvatar && !this.layoutService.drawerIsOpen;
  }

  @HostListener("window:resize", ["$event"])
  private onResize(event: any) {
    this.layoutService.setAsideLayoutType(event.target.innerWidth);
  }
}
