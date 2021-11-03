import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Icons } from "@app/core/enums";
import { Utils } from "@app/shared/utils";
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: "app-aside-mobile",
  templateUrl: "./aside-mobile.component.html",
  styleUrls: ["./aside-mobile.component.scss"]
})
export class AsideMobileComponent implements OnInit {
  @Input()
  public withAvatar = true;

  @Output()
  public hamburgerMenuClick: EventEmitter<void> = new EventEmitter();

  public iconsClassRef = Icons;

  constructor(public readonly auth: AuthService) {
  }

  public ngOnInit(): void {
  }

  public onHamburgerMenuClick(): void {
    this.hamburgerMenuClick.emit();
  }

  public getIconPath(iconName: string): string {
    return Utils.getIconPath(iconName);
  }

  public getDefaultUserPicture(name?: string): string {
    return Utils.getInitialsImage(name as string);
  }
}
