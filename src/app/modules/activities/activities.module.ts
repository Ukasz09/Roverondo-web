import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivitiesWallComponent } from "./pages";
import { AppSharedModule } from "@app/shared";
import { ActivitiesRoutingModule } from "./activities-routing.module";
import { MatIconModule } from "@angular/material/icon";
import { ActivityCardContentComponent, ActivityDetailsComponent, CommentsSheetComponent } from "./components";
import { ActivitiesResolver } from "./services";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatListModule } from "@angular/material/list";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";

@NgModule({
  declarations: [
    ActivitiesWallComponent,
    ActivityCardContentComponent,
    ActivityDetailsComponent,
    CommentsSheetComponent
  ],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    AppSharedModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatBottomSheetModule,
  ],
  providers: [
    ActivitiesResolver
  ]
})
export class ActivitiesModule {
}
