import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FollowersComponent, FollowingsComponent, UserProfileComponent } from "./pages";
import { AppSharedModule } from "@app/shared";
import { UserRoutingModule } from "./user-routing.module";
import { FollowersResolver, FollowingsResolver } from "./services";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { TimeUnitPipe } from "@app/shared/pipes";
import { MatButtonToggleModule } from "@angular/material/button-toggle";


@NgModule({
  declarations: [
    UserProfileComponent,
    FollowersComponent,
    FollowingsComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    UserRoutingModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonToggleModule
  ],
  exports: [],
  providers: [
    FollowersResolver,
    FollowingsResolver,
    TimeUnitPipe
  ]
})
export class UserModule {
}
