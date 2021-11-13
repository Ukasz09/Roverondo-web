import { Component, Inject, OnInit } from "@angular/core";
import { UserBottomSheet } from "@app/core/models";
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { EventsService, PostsService } from "@app/core/services";

@Component({
  selector: "app-event-participants-sheet",
  templateUrl: "./event-participants-sheet.component.html",
  styleUrls: ["./event-participants-sheet.component.scss"]
})
export class EventParticipantsSheetComponent implements OnInit {
  public userList?: UserBottomSheet[] = undefined;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { eventId: number },
    private readonly eventsService: EventsService,
    private readonly _bottomSheetRef: MatBottomSheetRef<EventParticipantsSheetComponent>
  ) {
  }

  public ngOnInit(): void {
    this.fetchParticipants();
  }

  private fetchParticipants(): void {
    this.eventsService.getParticipants$(this.data.eventId).subscribe(participants => {
      this.userList = participants;
    });
  }
}
