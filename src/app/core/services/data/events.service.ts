import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { User } from "@app/core/models";
import { environment } from "@app/env";

@Injectable({
  providedIn: "root"
})
export class EventsService {
  constructor(private readonly http: HttpClient) {
  }

  public joinToTheEvent$(eventId: number): Observable<boolean> {
    return of(true);
  }

  public leaveEvent$(eventId: number): Observable<boolean> {
    // TODO: integrate with backend - tmp mocked
    return of(true);
  }

  public getParticipants$(eventId: number): Observable<User[]> {
    const endpoint = `${environment.backendApi}/api/events/${eventId}/enrolled`;
    return this.http.get<User[]>(endpoint);
  }
}
