import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { LayoutsModule } from "src/app/layouts/layouts.module";
import { SharedModule as AppSharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LayoutsModule,
    AppSharedModule
  ]
})
export class AuthModule {
}
