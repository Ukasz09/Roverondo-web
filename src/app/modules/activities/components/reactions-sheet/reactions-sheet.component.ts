import { Component, Inject, OnInit } from "@angular/core";
import { Reaction } from "@app/core/models";
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { ActivitiesService } from "@app/core/services";
import { Router } from "@angular/router";
import { AppRoutes, UserRoutes } from "@app/core/enums";

@Component({
  selector: "app-reactions-sheet",
  templateUrl: "./reactions-sheet.component.html",
  styleUrls: ["./reactions-sheet.component.scss"]
})
export class ReactionsSheetComponent implements OnInit {
  public reactionList?: Reaction[] = undefined;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { postId: string },
    private readonly activitiesService: ActivitiesService,
    private readonly _bottomSheetRef: MatBottomSheetRef<ReactionsSheetComponent>,
    private readonly router: Router
  ) {
  }

  public ngOnInit(): void {
    this.fetchReactions();
  }

  public navigateToProfile(userId: string | number): void {
    this.router.navigate([this.getUserProfileLink(userId)]).then();
    this._bottomSheetRef.dismiss();
  }

  public getUserProfileLink(userId: string | number): string {
    return `/${AppRoutes.user}/${UserRoutes.profile}/${userId?.toString()}`;
  }

  private fetchReactions(): void {
    this.activitiesService.getReactions$(this.data.postId).subscribe(reactions => {
      this.reactionList = reactions;
    });
  }
}
