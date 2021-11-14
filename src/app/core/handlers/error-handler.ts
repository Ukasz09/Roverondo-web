import { ErrorHandler as IErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class AppErrorHandler implements IErrorHandler {

  public constructor() {
  }

  public handleError(err: unknown): void {
    this.handleNavigationError(err);
    throw err; // throw for now
  }

  public handleNavigationError(err: unknown): void {
    if (err instanceof Error) {
      console.error(`Error occurred during navigating process:\n${err.message}`);
    } else {
      console.error("Unknown error occurred during navigating process.");
    }
  }
}
