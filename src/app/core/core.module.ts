import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { EnsureModuleLoadedOnceGuard } from "./ensure-module-loaded-once.guard";


@NgModule({
  declarations: [],
  exports: [],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class AppCoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: AppCoreModule) {
    super(parentModule);
  }
}
