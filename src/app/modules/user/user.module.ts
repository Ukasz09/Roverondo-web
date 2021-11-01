import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FollowersComponent, FollowingComponent, UserProfileComponent } from "./pages";
import { UsersListComponent } from "./components";
import { AppSharedModule } from "@app/shared";
import { UserRoutingModule } from "./user-routing.module";
import { UserResolver } from "./services";


@NgModule({
  declarations: [
    UserProfileComponent,
    FollowersComponent,
    FollowingComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    UserRoutingModule
  ],
  providers: [
    UserResolver
  ]
})
export class UserModule {
}
