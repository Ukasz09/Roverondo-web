import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { FindFriendsComponent } from "./pages";

const routes: Routes = [
  {
    path: "",
    component: FindFriendsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindFriendsRoutingModule {
}
