import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostsResolver, WallResolver } from "./services";
import { UserResolver } from "@app/core/services";
import { ActivitiesPageComponent } from "./pages";

const routes: Routes = [
  {
    path: `:userId/wall/:type`,
    component: ActivitiesPageComponent,
    resolve: {
      activities: WallResolver,
      user: UserResolver
    }
  },
  {
    path: `:userId/:type`,
    component: ActivitiesPageComponent,
    resolve: {
      activities: PostsResolver,
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
