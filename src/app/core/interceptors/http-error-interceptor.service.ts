import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Router } from "@angular/router";
import { AppRoutes } from "@app/core/enums";
import { SnackbarInfoService } from "@app/core/services";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private readonly router: Router, private readonly snackbarInfoService: SnackbarInfoService) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.snackbarInfoService.openErrorSnackbar("Sorry, you need to authenticate yourself first");
            this.router.navigate([AppRoutes.auth]).then();
            return throwError(error.message);
          }
          this.snackbarInfoService.openErrorSnackbar("Something goes wrong, please try once again");
          return throwError(error.message);
        })
      );
  }
}
