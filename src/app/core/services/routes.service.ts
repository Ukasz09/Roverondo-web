import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RoutesService {
  private actualRoute = ["home"];
  private readonly routeChangeSubject$: Subject<string[]> = new BehaviorSubject<string[]>(this.actualRoute);

  public readonly routeChange$ = this.routeChangeSubject$.asObservable();

  constructor() {
  }

  public setActualRoute(route: string[]): void {
    this.actualRoute = route;
    this.routeChangeSubject$.next(this.actualRoute);
  }

  public getActualRoute(): string[] {
    return this.actualRoute;
  }
}
