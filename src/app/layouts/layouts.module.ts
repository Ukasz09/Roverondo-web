import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NavbarComponent } from "./navbar/navbar.component";
import { SharedModule as AppSharedModule } from "../shared/shared.module";
import { AsideComponent } from "./aside/aside.component";
import { AsideMobileComponent } from "./aside-mobile/aside-mobile.component";

@NgModule({
  declarations: [NavbarComponent, AsideComponent, AsideMobileComponent],
  imports: [
    CommonModule,
    AppSharedModule
  ],
  exports: [NavbarComponent, AsideComponent, AsideMobileComponent]
})
export class LayoutsModule {
}
