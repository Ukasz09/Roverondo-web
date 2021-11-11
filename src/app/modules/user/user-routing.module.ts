import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FollowersComponent, FollowingsComponent, LeaderboardComponent, UserProfileComponent } from "./pages";
import { UserRoutes } from "./user-routes";
import { FollowersResolver, FollowingsResolver, UserResolver } from "./services";
import { AppRoutes } from "@app/routes";

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
    path: `${UserRoutes.leaderboard}`,
    component: LeaderboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
