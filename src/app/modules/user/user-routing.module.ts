import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FollowersComponent, FollowingsComponent, LeaderboardComponent, UserProfileComponent } from "./pages";
import { FollowersResolver, FollowingsResolver, UserResolver } from "./services";
import { AppRoutes, UserRoutes } from "@app/core/enums";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: `/${AppRoutes.home}`
  },
  {
    path: `:id/${UserRoutes.profile}`,
    pathMatch: "full",
    component: UserProfileComponent,
    resolve: {
      user: UserResolver
    }
  },
  {
    path: `:id/${UserRoutes.followers}`,
    pathMatch: "full",
    component: FollowersComponent,
    resolve: {
      followers: FollowersResolver
    }
  },
  {
    path: `:id/${UserRoutes.followings}`,
    component: FollowingsComponent,
    resolve: {
      followings: FollowingsResolver
    }
  },
  {
    path: `${AppRoutes.leaderboard}`,
    component: LeaderboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
