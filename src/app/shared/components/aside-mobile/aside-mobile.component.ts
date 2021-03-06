import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Icons } from "@app/core/enums";
import { Utils } from "@app/shared/utils";
import { CurrentUserService } from "@app/core/services";

@Component({
  selector: "app-aside-mobile",
  templateUrl: "./aside-mobile.component.html",
  styleUrls: ["./aside-mobile.component.scss"]
})
export class AsideMobileComponent implements OnInit {
  @Input() public withAvatar = true;
  @Output() public hamburgerMenuClick: EventEmitter<void> = new EventEmitter();

  public Icons = Icons;

  constructor(public readonly currentUserService: CurrentUserService) {
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
