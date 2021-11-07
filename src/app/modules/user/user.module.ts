import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FollowersComponent, FollowingComponent, LeaderboardComponent, UserProfileComponent } from "./pages";
import { FollowPageComponent, UsersCardComponent } from "./components";
import { AppSharedModule } from "@app/shared";
import { UserRoutingModule } from "./user-routing.module";
import { UserResolver } from "./services";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    UserProfileComponent,
    FollowersComponent,
    FollowingComponent,
    UsersCardComponent,
    FollowPageComponent,
    LeaderboardComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    UserRoutingModule,
    MatProgressSpinnerModule
  ],
  providers: [
    UserResolver
  ]
})
export class UserModule {
}
