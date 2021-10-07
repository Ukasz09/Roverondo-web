import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Icons, Utils } from "@app/shared/utils";

@Component({
  selector: "app-aside-mobile",
  templateUrl: "./aside-mobile.component.html",
  styleUrls: ["./aside-mobile.component.scss"]
})
export class AsideMobileComponent implements OnInit {
  @Input() withAvatar = true;
  @Output() hamburgerMenuClick: EventEmitter<void> = new EventEmitter();

  public iconsClassRef = Icons;

  constructor() {
  }

  public get avatarWrapperClass(): string {
    return this.withAvatar ? "" : "aside-logo-out-animation";
  }

  public ngOnInit(): void {
  }

  public onHamburgerMenuClick(): void {
    this.hamburgerMenuClick.emit();
  }

  public getIconPath(iconName: string): string {
    return Utils.getIconPath(iconName);
  }
}
