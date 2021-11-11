import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarRef } from "@angular/material/snack-bar";
import { SnackbarErrorComponent } from "@app/shared/components";

@Injectable({
  providedIn: "root"
})
export class SnackbarInfoService {
  private errSnackbarRef?: MatSnackBarRef<any>;

  constructor(private _snackBar: MatSnackBar) {
  }

  public openTextSnackbar(msg: string, actionMsg: string, durationMs = 2000): void {
    this._snackBar.open(msg, actionMsg, {
      duration: durationMs
    });
  }

  public openErrorSnackbar(msg: string, durationMs = 5000): void {
    if (this.errSnackbarRef) {
      this.errSnackbarRef.dismiss();
    }
    this.errSnackbarRef = this._snackBar.openFromComponent(SnackbarErrorComponent, {
      duration: durationMs,
      data: msg,
      panelClass:['error-snackbar']
    });
  }
}
