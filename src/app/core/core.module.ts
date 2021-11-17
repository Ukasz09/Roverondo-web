import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { EnsureModuleLoadedOnceGuard } from "./ensure-module-loaded-once.guard";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { PressureUnitPipe, SpeedUnitPipe } from "@app/shared/pipes";

@NgModule({
  declarations: [],
  exports: [],
  imports: [
    CommonModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    SpeedUnitPipe,
    PressureUnitPipe
  ]
})
export class AppCoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: AppCoreModule) {
    super(parentModule);
  }
}
