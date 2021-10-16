import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Routes as AppRoutes } from "@app/routes";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: `/${AppRoutes.home}`
  }, {
    path: AppRoutes.home,
    loadChildren: async () => (await import("@app/modules/home")).HomeModule
  },
  {
    path: AppRoutes.auth,
    loadChildren: async () => (await import("@app/modules/auth")).AuthModule
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
