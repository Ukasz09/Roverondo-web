import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./pages";
import { AuthRoutes } from "@app/routes/auth";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: `${AuthRoutes.signIn}`
  },
  {
    path: AuthRoutes.signIn,
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
