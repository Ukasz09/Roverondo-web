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
  AreaGraphComponent,
  UserListComponent,
  UserCardComponent,
  SnackbarErrorComponent,
  UserListBottomSheetComponent,
  PageTitleComponent,
  GlassBtnMiniComponent,
  PageNotFoundComponent,
  TimeRangeBtnToggleComponent,
  VerticalBarGraphComponent
} from "@app/shared/components";
import {
  ActiveLinkDirective,
  DisabledLinkDirective,
  InputFocusDirective,
  StopPropagateClickEventDirective
} from "@app/shared/directives";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { MatIconModule } from "@angular/material/icon";
import { LengthUnitPipe, PressureUnitPipe, SpeedUnitPipe, TimeUnitPipe } from "@app/shared/pipes";
import { MatListModule } from "@angular/material/list";
import { MatRippleModule } from "@angular/material/core";
import { MatChipsModule } from "@angular/material/chips";

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
    LengthUnitPipe,
    SpeedUnitPipe,
    UserListComponent,
    UserCardComponent,
    SnackbarErrorComponent,
    UserListBottomSheetComponent,
    PageTitleComponent,
    GlassBtnMiniComponent,
    DisabledLinkDirective,
    StopPropagateClickEventDirective,
    PageNotFoundComponent,
    TimeUnitPipe,
    PressureUnitPipe,
    TimeRangeBtnToggleComponent,
    VerticalBarGraphComponent
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
    LengthUnitPipe,
    SpeedUnitPipe,
    UserListComponent,
    UserCardComponent,
    SnackbarErrorComponent,
    UserListBottomSheetComponent,
    PageTitleComponent,
    GlassBtnMiniComponent,
    DisabledLinkDirective,
    PageNotFoundComponent,
    TimeUnitPipe,
    PressureUnitPipe,
    TimeRangeBtnToggleComponent,
    VerticalBarGraphComponent,
    StopPropagateClickEventDirective
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
    MatIconModule,
    MatListModule,
    MatRippleModule,
    MatChipsModule
  ]
})
export class AppSharedModule {
}
