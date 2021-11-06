import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActivitiesWallComponent } from "./pages";
import { ActivitiesResolver } from "./services";

const routes: Routes = [
  {
    path: `:userId/:type`,
    component: ActivitiesWallComponent,
    resolve: {
      activities: ActivitiesResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule {
}
