import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LeaderboardComponent } from "./pages";
import { UserModule } from "@app/modules/user";
import { AppSharedModule } from "@app/shared";
import { LeaderboardRoutingModule } from "./leaderboard-routing.module";


@NgModule({
  declarations: [
    LeaderboardComponent
  ],
  imports: [
    CommonModule,
    LeaderboardRoutingModule,
    UserModule,
    AppSharedModule
  ]
})
export class LeaderboardModule {
}
