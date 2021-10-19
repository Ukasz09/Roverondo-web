import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Routes as AppRoutes } from "@app/routes";

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
