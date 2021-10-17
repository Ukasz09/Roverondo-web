import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./pages";
import { AppSharedModule } from "@app/shared";
import { AuthRoutingModule as AppAuthRoutingModule } from "./auth-routing.module";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    AppAuthRoutingModule
  ]
})
export class AuthModule {
}
