import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

import { GlassCardComponent } from "./components/glass-card/glass-card.component";
import { GlassBtnComponent } from "./components/glass-btn/glass-btn.component";
import { LogoTextComponent } from "./components/logo-text/logo-text.component";
import { ProfileAvatarComponent } from "./components/profile-avatar/profile-avatar.component";
import { ProfileAvatarLoggedUserComponent } from "./components/profile-avatar-logged-user/profile-avatar-logged-user.component";
import { ActiveLinkDirective } from "@roverondo/shared/directives";

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
