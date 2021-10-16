import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./pages";
import { SharedModule as AppSharedModule } from "@app/shared";
import { HomeRoutingModule as AppHomeRoutingModule } from "./home-routing.module";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    AppHomeRoutingModule
  ]
})
export class HomeModule {
}
