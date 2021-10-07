import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";

import { LayoutsModule as AppLayoutsModule } from "../../layouts/layouts.module";
import { SharedModule as AppSharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,

    AppLayoutsModule,
    AppSharedModule
  ]
})
export class AuthModule {
}
