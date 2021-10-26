import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./pages";
import { AppSharedModule } from "@app/shared";
import { HomeRoutingModule as AppHomeRoutingModule } from "./home-routing.module";
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    AppHomeRoutingModule,
    NgxSpinnerModule
  ]
})
export class HomeModule {
}
