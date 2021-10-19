import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActivitiesWallComponent } from "./pages";
import { ActivitiesRoutes } from "@app/routes/activities";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: `${ActivitiesRoutes.allActivities}`
  },
  {
    path: ActivitiesRoutes.allActivities,
    component: ActivitiesWallComponent
  }, {
    path: ActivitiesRoutes.myActivities,
    component: ActivitiesWallComponent
  }, {
    path: ActivitiesRoutes.likedActivities,
    component: ActivitiesWallComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule {
}
