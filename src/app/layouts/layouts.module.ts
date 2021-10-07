import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule as AppSharedModule } from "../shared/shared.module";

import { AsideMobileComponent } from "./aside-mobile/aside-mobile.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { DrawerMenuComponent } from "./drawer-menu/drawer-menu.component";
import { AsideLayoutComponent } from "./aside-layout/aside-layout.component";
import { MatSidenavModule } from "@angular/material/sidenav";

@NgModule({
  declarations: [NavbarComponent, AsideMobileComponent, DrawerMenuComponent, AsideLayoutComponent],
  imports: [
    CommonModule,

    MatSidenavModule,

    AppSharedModule
  ],
  exports: [NavbarComponent, AsideLayoutComponent]
})
export class LayoutsModule {
}
