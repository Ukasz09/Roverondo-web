import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActivitiesWallComponent } from "./pages";
import { ActivitiesResolver } from "./services";
import { UserResolver } from "@app/core/services";

const routes: Routes = [
  {
    path: `:userId/wall/:type`,
    component: ActivitiesWallComponent,
    resolve: {
      activities: ActivitiesResolver,
      user: UserResolver
    }
  },
  {
    path: `:userId/:type`,
    component: ActivitiesWallComponent,
    resolve: {
      activities: ActivitiesResolver,
      user: UserResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule {
}
