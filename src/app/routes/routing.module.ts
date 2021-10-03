import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "../modules/auth/login/login.component";
import { HomeComponent } from "../modules/home/home.component";
import { AppRoutes } from "./app-routes";

const routes: Routes = [
  {
    path: AppRoutes.SIGN_IN,
    component: LoginComponent
  },
  {
    path: AppRoutes.HOME,
    component: HomeComponent
  },
  {
    path: "",
    redirectTo: `/${AppRoutes.HOME}`,
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: `/${AppRoutes.HOME}`,
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
}
