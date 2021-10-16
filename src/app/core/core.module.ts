import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatSidenavModule } from "@angular/material/sidenav";
import {
  AsideLayoutComponent,
  AsideMobileComponent,
  DrawerMenuComponent,
  NavbarComponent
} from "@app/core/component";
import { SharedModule as AppSharedModule } from "@app/shared";
import { RouterModule as AppRouterModule } from "@angular/router";


@NgModule({
  declarations: [
    AsideLayoutComponent,
    AsideMobileComponent,
    DrawerMenuComponent,
    NavbarComponent
  ],
  exports: [
    AsideLayoutComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    AppRouterModule,
    AppSharedModule
  ]
})
export class CoreModule {
}
