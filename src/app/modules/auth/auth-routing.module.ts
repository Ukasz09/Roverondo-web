import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent, SignInCallbackComponent } from "./pages";
import { AuthRoutes } from "@app/core/enums";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: `${AuthRoutes.signIn}`
  },
  {
    path: AuthRoutes.signInCallback,
    component: SignInCallbackComponent
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
