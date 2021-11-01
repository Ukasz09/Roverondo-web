import { Component, Inject, OnInit } from "@angular/core";
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { ActivitiesService } from "@app/core/services";
import { PostComment } from "@app/core/models";

@Component({
  selector: "app-comments-sheet",
  templateUrl: "./comments-sheet.component.html",
  styleUrls: ["./comments-sheet.component.scss"]
})
export class CommentsSheetComponent implements OnInit {
  public commentList?: PostComment[] = undefined;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { postId: string },
    private readonly activitiesService: ActivitiesService,
    private readonly _bottomSheetRef: MatBottomSheetRef<CommentsSheetComponent>
  ) {
  }

  public ngOnInit(): void {
    this.fetchComments();
  }

  private fetchComments(): void {
    this.activitiesService.getComments(this.data.postId).subscribe({
      next: comments => {
        this.commentList = comments;
      }
    });
  }
}
