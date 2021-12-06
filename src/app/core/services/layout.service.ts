import { Injectable } from "@angular/core";
import { LayoutType } from "@app/core/enums";
import { Constants } from "@app/core/constants";

@Injectable({
  providedIn: "root"
})
export class LayoutService {
  public drawerIsOpen = false;
  public width: number;

  constructor() {
    this.width = window.innerWidth;
  }

  public _layoutType = LayoutType.ASIDE_NATIVE;

  public get layoutType(): LayoutType {
    return this._layoutType;
  }

  public setAsideLayoutType(width: number): void {
    this.width = width;
    this._layoutType = this.width < Constants.pcResolutionThresholdPx ? LayoutType.ASIDE_MOBILE : LayoutType.ASIDE_NATIVE;
    if (this.layoutType === LayoutType.ASIDE_NATIVE) {
      this.drawerIsOpen = false;
    }
  }

  public setNavbarLayoutType(): void {
    this._layoutType = LayoutType.NAVBAR;
  }
}
