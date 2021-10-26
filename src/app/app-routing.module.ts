import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppRoutes as AppRoutes } from "@app/routes";
import { AuthGuard } from "@auth0/auth0-angular";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: `${AppRoutes.auth}`
  }, {
    path: AppRoutes.home,
    loadChildren: async () => (await import("@app/modules/home")).HomeModule
  },
  {
    path: AppRoutes.auth,
    loadChildren: async () => (await import("@app/modules/auth")).AuthModule
  }, {
    path: AppRoutes.activities,
    canActivate: [AuthGuard],
    loadChildren: async () => (await import("@app/modules/activities")).ActivitiesModule
  },
  {
    path: "**",
    redirectTo: `/${AppRoutes.home}`
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
}
