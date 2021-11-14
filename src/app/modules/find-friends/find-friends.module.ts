import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FindFriendsComponent } from "./pages";
import { AppSharedModule } from "@app/shared";
import { FindFriendsRoutingModule } from "./find-friends-routing.module";

@NgModule({
  declarations: [
    FindFriendsComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    FindFriendsRoutingModule
  ]
})
export class FindFriendsModule {
}
