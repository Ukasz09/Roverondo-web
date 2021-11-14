import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FollowersComponent, FollowingsComponent, UserProfileComponent } from "./pages";
import { AppSharedModule } from "@app/shared";
import { UserRoutingModule } from "./user-routing.module";
import { FollowersResolver, FollowingsResolver } from "./services";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";


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
    MatProgressSpinnerModule
  ],
  exports: [],
  providers: [
    FollowersResolver,
    FollowingsResolver
  ]
})
export class UserModule {
}
