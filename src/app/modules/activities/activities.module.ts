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
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

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
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    ActivitiesResolver
  ]
})
export class ActivitiesModule {
}
