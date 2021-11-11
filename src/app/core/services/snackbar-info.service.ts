import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class SnackbarInfoService {
  constructor(private _snackBar: MatSnackBar) {
  }

  public openSnackbar(msg: string, actionMsg: string, durationMs = 2000): void {
    this._snackBar.open(msg, actionMsg, {
      duration: durationMs
    });
  }
}
