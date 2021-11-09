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
import { MToKmPipe } from "@app/shared/pipes";
import { MsToKmhPipe } from "./pipes/ms-to-kmh.pipe";

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
    AreaGraphComponent,
    MToKmPipe,
    MsToKmhPipe
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
    AreaGraphComponent,
    MToKmPipe,
    MsToKmhPipe
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
