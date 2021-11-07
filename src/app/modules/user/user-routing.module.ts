import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FollowersComponent, FollowingComponent, LeaderboardComponent, UserProfileComponent } from "./pages";
import { UserRoutes } from "./user-routes";
import { UserResolver } from "./services";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: `${UserRoutes.profile}`
  },
  {
    path: `${UserRoutes.profile}`,
    pathMatch: "full",
    component: UserProfileComponent,
    resolve: {
      user: UserResolver
    }
  },
  {
    path: `${UserRoutes.profile}/:id`,
    component: UserProfileComponent,
    resolve: {
      user: UserResolver
    }
  },
  {
    path: `${UserRoutes.followers}`,
    pathMatch: "full",
    component: FollowersComponent,
    resolve: {
      user: UserResolver
    }
  },
  {
    path: `${UserRoutes.followers}/:id`,
    component: FollowersComponent,
    resolve: {
      user: UserResolver
    }
  },
  {
    path: `${UserRoutes.following}`,
    pathMatch: "full",
    component: FollowingComponent,
    resolve: {
      user: UserResolver
    }
  },
  {
    path: `${UserRoutes.following}/:id`,
    component: FollowingComponent,
    resolve: {
      user: UserResolver
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
