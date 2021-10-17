import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivitiesWallComponent } from "./pages";
import { AppSharedModule } from "@app/shared";
import { ActivitiesRoutingModule } from "./activities-routing.module";

@NgModule({
  declarations: [
    ActivitiesWallComponent
  ],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    AppSharedModule
  ]
})
export class ActivitiesModule {
}
