import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { MatSidenavModule } from "@angular/material/sidenav";

import { SharedModule as AppSharedModule } from "../shared/shared.module";
import { RoutingModule as AppRoutingModule } from "../routes/routing.module";

import { AsideMobileComponent } from "./aside-mobile/aside-mobile.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { DrawerMenuComponent } from "./drawer-menu/drawer-menu.component";
import { AsideLayoutComponent } from "./aside-layout/aside-layout.component";

@NgModule({
  declarations: [NavbarComponent, AsideMobileComponent, DrawerMenuComponent, AsideLayoutComponent],
  imports: [
    RouterModule,
    CommonModule,

    MatSidenavModule,

    AppSharedModule,
    AppRoutingModule
  ],
  exports: [NavbarComponent, AsideLayoutComponent]
})
export class LayoutsModule {
}
