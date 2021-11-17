import { NgModule } from "@angular/core";
import { CommonModule, DecimalPipe } from "@angular/common";
import { ActivitiesWallComponent } from "./pages";
import { AppSharedModule } from "@app/shared";
import { ActivitiesRoutingModule } from "./activities-routing.module";
import { MatIconModule } from "@angular/material/icon";
import {
  ActivitiesListComponent,
  ActivityCardContentComponent,
  ActivityDetailsComponent,
  CommentsSheetComponent, EventParticipantsSheetComponent, FilterSheetComponent,
  ReactionsSheetComponent
} from "./components";
import { PostsResolver, WallResolver } from "./services";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatListModule } from "@angular/material/list";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LengthUnitPipe, PressureUnitPipe, SpeedUnitPipe } from "@app/shared/pipes";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";

@NgModule({
  declarations: [
    ActivitiesWallComponent,
    ActivityCardContentComponent,
    ActivityDetailsComponent,
    CommentsSheetComponent,
    ReactionsSheetComponent,
    ActivitiesListComponent,
    EventParticipantsSheetComponent,
    FilterSheetComponent
  ],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    AppSharedModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatBottomSheetModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatRippleModule
  ],
  providers: [
    WallResolver,
    PostsResolver,
    LengthUnitPipe,
    DecimalPipe,
    SpeedUnitPipe,
  ]
})
export class ActivitiesModule {
}
