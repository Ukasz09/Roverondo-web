import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Routes as AppRoutes } from "@app/routes";
import { LoginComponent } from "./pages";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
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
export class AuthRoutingModule {
}
