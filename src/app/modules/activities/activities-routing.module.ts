import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActivitiesWallComponent } from "./pages";
import { Routes as AppRoutes } from "@app/routes";
import { LoginComponent } from "@app/modules/auth";

const routes: Routes = [
  {
    path: "",
    component: ActivitiesWallComponent,
    redirectTo: `${AppRoutes.signIn}`
  },
  {
    path: AppRoutes.signIn,
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule {
}
