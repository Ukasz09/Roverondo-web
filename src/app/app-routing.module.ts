import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomAuthGuard } from "@app/core/guards";
import { AppRoutes } from "@app/core/enums";
import { PageNotFoundComponent } from "@app/shared/components";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: `${AppRoutes.home}`
  },
  {
    path: AppRoutes.pageNotFound,
    component: PageNotFoundComponent
  },
  {
    path: AppRoutes.home,
    canActivate: [CustomAuthGuard],
    loadChildren: async () => (await import("@app/modules/home")).HomeModule
  },
  {
    path: AppRoutes.auth,
    loadChildren: async () => (await import("@app/modules/auth")).AuthModule
  }, {
    path: AppRoutes.activities,
    canActivate: [CustomAuthGuard],
    loadChildren: async () => (await import("@app/modules/activities")).ActivitiesModule
  },
  {
    path: AppRoutes.user,
    canActivate: [CustomAuthGuard],
    loadChildren: async () => (await import("@app/modules/user")).UserModule
  },
  {
    path: AppRoutes.leaderboard,
    canActivate: [CustomAuthGuard],
    loadChildren: async () => (await import("@app/modules/leaderboard")).LeaderboardModule
  },
  {
    path: AppRoutes.findFriends,
    canActivate: [CustomAuthGuard],
    loadChildren: async () => (await import("@app/modules/find-friends")).FindFriendsModule
  },
  {
    path: "**",
    redirectTo: `/${AppRoutes.pageNotFound}`
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
}
