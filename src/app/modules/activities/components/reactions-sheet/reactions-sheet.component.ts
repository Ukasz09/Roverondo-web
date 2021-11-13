import { Component, Inject, OnInit } from "@angular/core";
import { UserBottomSheet } from "@app/core/models";
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { PostsService } from "@app/core/services";

@Component({
  selector: "app-reactions-sheet",
  templateUrl: "./reactions-sheet.component.html",
  styleUrls: ["./reactions-sheet.component.scss"]
})
export class ReactionsSheetComponent implements OnInit {
  public userList?: UserBottomSheet[] = undefined;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { postId: string },
    private readonly postsService: PostsService,
    private readonly _bottomSheetRef: MatBottomSheetRef<ReactionsSheetComponent>,
  ) {
  }

  public ngOnInit(): void {
    this.fetchReactions();
  }

  private fetchReactions(): void {
    this.postsService.getReactions$(this.data.postId).subscribe(reactions => {
      this.userList = reactions.map(r => r.user);
    });
  }
}
