import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { SharedModule as AppSharedModule } from "src/app/shared/shared.module";
import { LayoutsModule as AppLayoutsModule } from "src/app/layouts/layouts.module";

import { MatSidenavModule } from "@angular/material/sidenav";
import { ActiveLinkDirective } from "@roverondo/shared/directives";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    AppSharedModule,
    AppLayoutsModule
  ]
})
export class HomeModule {
}
