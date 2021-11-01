import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FollowersComponent, FollowingComponent, UserProfileComponent } from "./pages";
import { UserRoutes } from "./user-routes";
import { UserResolver } from "./services";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: UserProfileComponent,
    resolve: {
      user: UserResolver
    }
  },
  {
    path: ":id",
    component: UserProfileComponent,
    resolve: {
      user: UserResolver
    }
  },
  {
    path: `:id/${UserRoutes.followers}`,
    component: FollowersComponent,
    resolve: {
      user: UserResolver
    }
  },
  {
    path: `:id/${UserRoutes.following}`,
    component: FollowingComponent,
    resolve: {
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
