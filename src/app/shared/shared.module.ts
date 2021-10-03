import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

import { GlassCardComponent } from "./components/glass-card/glass-card.component";
import { GlassBtnComponent } from "./components/glass-btn/glass-btn.component";
import { FbIconComponent } from "./components/icons/fb-icon/fb-icon.component";
import { GithubIconComponent } from "./components/icons/github-icon/github-icon.component";
import { GoogleIconComponent } from "./components/icons/google-icon/google-icon.component";
import { LogoTextComponent } from "./components/logo-text/logo-text.component";
import { HamburgerMenuComponent } from "./components/icons/hamburger-menu/hamburger-menu.component";
import { ProfileAvatarComponent } from "./components/profile-avatar/profile-avatar.component";
import { ProfileAvatarLoggedUserComponent } from "./components/profile-avatar-logged-user/profile-avatar-logged-user.component";

@NgModule({
  declarations: [
    GlassCardComponent,
    GlassBtnComponent,
    FbIconComponent,
    GithubIconComponent,
    GoogleIconComponent,
    LogoTextComponent,
    HamburgerMenuComponent,
    ProfileAvatarComponent,
    ProfileAvatarLoggedUserComponent
  ],
  imports: [CommonModule, MatCardModule, MatButtonModule],
  exports: [
    GlassCardComponent,
    GlassBtnComponent,
    FbIconComponent,
    GithubIconComponent,
    GoogleIconComponent,
    LogoTextComponent,
    HamburgerMenuComponent,
    ProfileAvatarComponent,
    ProfileAvatarLoggedUserComponent
  ]
})
export class SharedModule {
}
