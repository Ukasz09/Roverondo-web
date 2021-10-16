import { Injectable } from "@angular/core";
import { Utils } from "@app/shared/utils";
import { LayoutTypeEnum } from "@app/core/enums";
import { Constants } from "@app/core/constants";

@Injectable({
  providedIn: "root"
})
export class LayoutService {
  public drawerIsOpen = false;

  constructor() {
  }

  public _layoutType = LayoutTypeEnum.ASIDE_NATIVE;

  public get layoutType(): LayoutTypeEnum {
    return this._layoutType;
  }

  public setAsideLayoutType(width: number): void {
    this._layoutType = width < Constants.pcResolutionThresholdPx ? LayoutTypeEnum.ASIDE_MOBILE : LayoutTypeEnum.ASIDE_NATIVE;
    if (this.layoutType === LayoutTypeEnum.ASIDE_NATIVE) {
      this.drawerIsOpen = false;
    }
  }

  public setNavbarLayoutType(): void {
    this._layoutType = LayoutTypeEnum.NAVBAR;
  }
}
