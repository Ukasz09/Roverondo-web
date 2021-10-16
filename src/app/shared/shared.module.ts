import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import {
  GlassBtnComponent,
  GlassCardComponent,
  LogoTextComponent,
  ProfileAvatarComponent
} from "@app/shared/components";
import { ActiveLinkDirective } from "@app/shared/directives";

@NgModule({
  declarations: [
    GlassCardComponent,
    GlassBtnComponent,
    LogoTextComponent,
    ProfileAvatarComponent,
    ActiveLinkDirective
  ],
  exports: [
    GlassCardComponent,
    GlassBtnComponent,
    LogoTextComponent,
    ProfileAvatarComponent,
    ActiveLinkDirective
  ],
  imports: [CommonModule, MatCardModule, MatButtonModule]
})
export class SharedModule {
}
