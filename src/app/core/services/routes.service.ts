import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RoutesService {
  public readonly routeChange: Subject<string> = new Subject<string>();

  private actualRoute?: string;

  constructor() {
  }

  public setActualRoute(value: string): void {
    this.actualRoute = value;
    this.routeChange.next(this.actualRoute);
  }

  public getActualRoute(): string | undefined {
    return this.actualRoute;
  }
}
