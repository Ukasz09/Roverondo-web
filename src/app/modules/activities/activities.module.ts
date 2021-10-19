import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivitiesWallComponent } from "./pages";
import { AppSharedModule } from "@app/shared";
import { ActivitiesRoutingModule } from "./activities-routing.module";
import { MatIconModule } from "@angular/material/icon";
import { ActivityCardContentComponent } from "./components";

@NgModule({
  declarations: [
    ActivitiesWallComponent,
    ActivityCardContentComponent
  ],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    AppSharedModule,
    MatIconModule
  ]
})
export class ActivitiesModule {
}
