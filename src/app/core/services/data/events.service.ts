import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { User, UserBottomSheet } from "@app/core/models";
import { environment } from "@app/env";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class EventsService {
  constructor(private readonly http: HttpClient) {
  }

  public joinToTheEvent$(eventId: number): Observable<boolean> {
    // TODO: integrate with backend - tmp mocked
    return of(true);
  }

  public leaveEvent$(eventId: number): Observable<boolean> {
    // TODO: integrate with backend - tmp mocked
    return of(true);
  }

  public getParticipants$(eventId: number): Observable<User[]> {
    // TODO: integrate with backend - tmp mocked
    const endpoint = `${environment.backendApi}/api/users`;
    return this.http.get<User[]>(endpoint).pipe(tap(data => console.log(data)));
  }
}
