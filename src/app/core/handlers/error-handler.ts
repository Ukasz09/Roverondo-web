import { ErrorHandler as IErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class AppErrorHandler implements IErrorHandler {

  public constructor() {
  }

  public handleError(err: unknown): void {
    if (err instanceof Error) {
      console.error(`Error occurred:\n${err.message}`);
    } else {
      console.error("Unknown error occurred");
    }
    throw err; // throw for now
  }
}
