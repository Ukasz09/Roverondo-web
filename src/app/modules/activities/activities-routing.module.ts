import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActivitiesWallComponent } from "./pages";
import { PostsResolver, WallResolver } from "./services";
import { UserResolver } from "@app/core/services";

const routes: Routes = [
  {
    path: `:userId/wall/:type`,
    component: ActivitiesWallComponent,
    resolve: {
      activities: WallResolver,
      user: UserResolver
    }
  },
  {
    path: `:userId/:type`,
    component: ActivitiesWallComponent,
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
