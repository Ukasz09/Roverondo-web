import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeComponent } from "./home.component";

import { SharedModule as AppSharedModule } from "src/app/shared/shared.module";
import { LayoutsModule as AppLayoutsModule } from "../../layouts/layouts.module";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,

    AppSharedModule,
    AppLayoutsModule
  ]
})
export class HomeModule {
}
