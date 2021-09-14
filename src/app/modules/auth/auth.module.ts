import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LayoutsModule } from 'src/app/layouts/layouts.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,

    // Custom
    LayoutsModule,
  ],
})
export class AuthModule {}
