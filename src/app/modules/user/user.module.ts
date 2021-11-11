import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FollowersComponent, FollowingsComponent, LeaderboardComponent, UserProfileComponent } from "./pages";
import { UserListPageComponent, UsersCardComponent } from "./components";
import { AppSharedModule } from "@app/shared";
import { UserRoutingModule } from "./user-routing.module";
import { FollowersResolver, FollowingsResolver, UserResolver } from "./services";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    UserProfileComponent,
    FollowersComponent,
    FollowingsComponent,
    UsersCardComponent,
    UserListPageComponent,
    LeaderboardComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    UserRoutingModule,
    MatProgressSpinnerModule
  ],
  providers: [
    UserResolver,
    FollowersResolver,
    FollowingsResolver
  ]
})
export class UserModule {
}
