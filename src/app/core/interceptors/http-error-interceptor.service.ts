import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { AppRoutes } from "@app/core/enums";
import { SnackbarInfoService, UsersService } from "@app/core/services";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class HttpErrorInterceptor implements HttpInterceptor {
  public readonly requestsWithoutNotification = [
    UsersService.registerUserEndpoint
  ];

  constructor(private readonly router: Router, private readonly snackbarInfoService: SnackbarInfoService) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const withoutNotification = this.requestsWithoutNotification.includes(request.url);
          if (withoutNotification) {
            return throwError(error.message);
          }
          switch (error.status) {
            case 401: {
              this.snackbarInfoService.openErrorSnackbar("Sorry, you need to authenticate yourself first");
              this.router.navigate([AppRoutes.auth]).then();
              return throwError(error.message);
            }
            case 403: {
              this.snackbarInfoService.openErrorSnackbar(
                "Sorry, it seems that you don't have rights for this action"
              );
              return throwError(error.message);
            }
            default: {
              this.snackbarInfoService.openErrorSnackbar("Something goes wrong, please try once again");
              return throwError(error.message);
            }
          }
        })
      );
  }
}
