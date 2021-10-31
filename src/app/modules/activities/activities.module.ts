import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivitiesWallComponent } from "./pages";
import { AppSharedModule } from "@app/shared";
import { ActivitiesRoutingModule } from "./activities-routing.module";
import { MatIconModule } from "@angular/material/icon";
import { ActivityCardContentComponent, ActivityDetailsComponent } from "./components";
import { ActivitiesResolver } from "./services";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDividerModule } from "@angular/material/divider";

@NgModule({
  declarations: [
    ActivitiesWallComponent,
    ActivityCardContentComponent,
    ActivityDetailsComponent
  ],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    AppSharedModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  providers: [
    ActivitiesResolver
  ]
})
export class ActivitiesModule {
}
