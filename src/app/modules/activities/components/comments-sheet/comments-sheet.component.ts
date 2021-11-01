import { Component, OnInit } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";

@Component({
  selector: "app-comments-sheet",
  templateUrl: "./comments-sheet.component.html",
  styleUrls: ["./comments-sheet.component.scss"]
})
export class CommentsSheetComponent implements OnInit {
  constructor(private _bottomSheetRef: MatBottomSheetRef<CommentsSheetComponent>) {
  }

  public ngOnInit(): void {
  }
}
