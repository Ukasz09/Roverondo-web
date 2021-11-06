import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import {
  AsideLayoutComponent,
  AsideMobileComponent,
  DrawerMenuComponent,
  GlassBtnComponent,
  GlassCardComponent,
  LogoTextComponent,
  MapComponent,
  NavbarComponent,
  ProfileAvatarComponent,
  ScrollContainerComponent,
  AreaGraphComponent
} from "@app/shared/components";
import { ActiveLinkDirective, InputFocusDirective } from "@app/shared/directives";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [
    GlassCardComponent,
    GlassBtnComponent,
    LogoTextComponent,
    ProfileAvatarComponent,
    ActiveLinkDirective,
    InputFocusDirective,
    AsideLayoutComponent,
    AsideMobileComponent,
    DrawerMenuComponent,
    NavbarComponent,
    ScrollContainerComponent,
    MapComponent,
    AreaGraphComponent
  ],
  exports: [
    GlassCardComponent,
    GlassBtnComponent,
    LogoTextComponent,
    ProfileAvatarComponent,
    ActiveLinkDirective,
    InputFocusDirective,
    AsideLayoutComponent,
    NavbarComponent,
    ScrollContainerComponent,
    MapComponent,
    AreaGraphComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    RouterModule,
    HttpClientModule,
    LeafletModule,
    MatProgressSpinnerModule,
    NgxChartsModule,
    MatIconModule
  ]
})
export class AppSharedModule {
}
