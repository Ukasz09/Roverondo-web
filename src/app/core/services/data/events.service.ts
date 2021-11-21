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

  public joinToTheEvent$(eventId: number, currentUserId: number): Observable<void> {
    const endpoint = `${environment.backendApi}/api/events/${eventId}/enrolled/${currentUserId}`;
    return this.http.post<void>(endpoint, {});
  }

  public leaveEvent$(eventId: number, currentUserId: number): Observable<void> {
    const endpoint = `${environment.backendApi}/api/events/${eventId}/enrolled/${currentUserId}`;
    return this.http.delete<void>(endpoint, {});
  }

  public getParticipants$(eventId: number): Observable<User[]> {
    const endpoint = `${environment.backendApi}/api/events/${eventId}/enrolled`;
    return this.http.get<User[]>(endpoint);
  }
}
