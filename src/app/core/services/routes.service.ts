import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class RoutesService {
  public actualRoute?: string;

  constructor() {
  }
}
