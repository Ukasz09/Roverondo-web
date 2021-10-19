import { Injectable } from "@angular/core";
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable()
export class ActivitiesResolver implements Resolve<string | null> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string | null> {
    return of(route.paramMap.get("type"));
  }
}
