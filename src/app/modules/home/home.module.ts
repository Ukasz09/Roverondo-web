import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutsModule } from 'src/app/layouts/layouts.module';

import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,

    // Material
    MatSidenavModule,

    // Custom
    SharedModule,
    LayoutsModule,
  ],
})
export class HomeModule {}
