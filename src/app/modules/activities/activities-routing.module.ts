import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActivitiesWallComponent } from "./pages";
import { ActivitiesResolver } from "./services";
import { ActivitiesRoutes } from "@app/routes/activities";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: ActivitiesRoutes.allActivities
  },
  {
    path: `:type`,
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
