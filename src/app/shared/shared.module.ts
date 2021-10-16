import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import {
  AsideLayoutComponent, AsideMobileComponent, DrawerMenuComponent,
  GlassBtnComponent,
  GlassCardComponent,
  LogoTextComponent, NavbarComponent,
  ProfileAvatarComponent
} from "@app/shared/components";
import { ActiveLinkDirective } from "@app/shared/directives";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    GlassCardComponent,
    GlassBtnComponent,
    LogoTextComponent,
    ProfileAvatarComponent,
    ActiveLinkDirective,
    AsideLayoutComponent,
    AsideMobileComponent,
    DrawerMenuComponent,
    NavbarComponent
  ],
  exports: [
    GlassCardComponent,
    GlassBtnComponent,
    LogoTextComponent,
    ProfileAvatarComponent,
    ActiveLinkDirective,
    AsideLayoutComponent,
    NavbarComponent
  ],
  imports: [CommonModule, MatCardModule, MatButtonModule, MatSidenavModule, RouterModule]
})
export class SharedModule {
}
