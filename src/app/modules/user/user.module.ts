import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FollowersComponent, FollowingComponent, UserProfileComponent } from "./pages";
import { UsersListComponent } from "./components";
import { AppSharedModule } from "@app/shared";
import { UserRoutingModule } from "./user-routing.module";
import { UserResolver } from "./services";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FollowPageComponent } from './components/follow-page/follow-page.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    FollowersComponent,
    FollowingComponent,
    UsersListComponent,
    FollowPageComponent
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
