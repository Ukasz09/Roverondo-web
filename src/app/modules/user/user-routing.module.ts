import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FollowersComponent, FollowingsComponent, UserProfileComponent } from "./pages";
import { FollowersResolver, FollowingsResolver } from "./services";
import { AppRoutes, UserRoutes } from "@app/core/enums";
import { UserResolver } from "@app/core/services";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: `/${AppRoutes.pageNotFound}`
  },
  {
    path: `:userId/${UserRoutes.profile}`,
    pathMatch: "full",
    component: UserProfileComponent,
    resolve: {
      user: UserResolver
    }
  },
  {
    path: `:userId/${UserRoutes.followers}`,
    pathMatch: "full",
    component: FollowersComponent,
    resolve: {
      followers: FollowersResolver,
      user: UserResolver
    }
  },
  {
    path: `:userId/${UserRoutes.followings}`,
    component: FollowingsComponent,
    resolve: {
      followings: FollowingsResolver,
      user: UserResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
