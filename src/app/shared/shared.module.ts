import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

import {
  GlassBtnComponent,
  GlassCardComponent,
  LogoTextComponent,
  ProfileAvatarComponent, ProfileAvatarLoggedUserComponent
} from "@app/shared/components";
import { ActiveLinkDirective } from "@app/shared/directives";

@NgModule({
  declarations: [
    GlassCardComponent,
    GlassBtnComponent,
    LogoTextComponent,
    ProfileAvatarComponent,
    ProfileAvatarLoggedUserComponent,
    ActiveLinkDirective
  ],
  imports: [CommonModule, MatCardModule, MatButtonModule],
  exports: [
    GlassCardComponent,
    GlassBtnComponent,
    LogoTextComponent,
    ProfileAvatarComponent,
    ProfileAvatarLoggedUserComponent,
    ActiveLinkDirective
  ]
})
export class SharedModule {
}
