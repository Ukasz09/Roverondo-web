import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RoutingModule as AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AppCoreModule } from "@app/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { NgxSpinnerModule } from "ngx-spinner";
import { AuthHttpInterceptor, AuthModule } from "@auth0/auth0-angular";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { environment as env } from "../environments/environment";
import { HttpErrorInterceptor } from "@app/core/interceptors";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    AppRoutingModule,
    AppCoreModule,
    NgxSpinnerModule,
    AuthModule.forRoot({
      ...env.auth,
      httpInterceptor: {
        ...env.httpInterceptor
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
