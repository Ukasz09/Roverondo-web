import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../modules/auth/login/login.component';
import { AppRoutes } from './app-routes';

const routes: Routes = [
  {
    path: AppRoutes.SIGN_IN,
    component: LoginComponent,
  },
  {
    path: AppRoutes.HOME,
    redirectTo: `/${AppRoutes.SIGN_IN}`,
  },
  {
    path: '',
    redirectTo: `/${AppRoutes.SIGN_IN}`,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: `/${AppRoutes.SIGN_IN}`,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
