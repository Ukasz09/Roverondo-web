import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";

import { RoutingModule as AppRoutingModule } from "./routes/routing.module";
import { LayoutsModule as AppLayoutsModule } from "./layouts/layouts.module";
import { AuthModule as AppAuthModule } from "./modules/auth/auth.module";
import { HomeModule as AppHomeModule } from "./modules/home/home.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,
    AppLayoutsModule,
    AppAuthModule,
    AppHomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
