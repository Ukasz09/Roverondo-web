import { Component, Inject, OnInit } from "@angular/core";
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { ActivitiesService, CurrentUserService } from "@app/core/services";
import { PostComment, PostExtended, User } from "@app/core/models";
import { NgModel } from "@angular/forms";
import { AppRoutes } from "@app/routes";
import { UserRoutes } from "@app/modules/user";
import { Router } from "@angular/router";

@Component({
  selector: "app-comments-sheet",
  templateUrl: "./comments-sheet.component.html",
  styleUrls: ["./comments-sheet.component.scss"]
})
export class CommentsSheetComponent implements OnInit {
  public commentList: PostComment[] = [];
  public newCommentValue = "";
  public showSpinner = true;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { post: PostExtended, withFocus: boolean },
    private readonly activitiesService: ActivitiesService,
    private readonly _bottomSheetRef: MatBottomSheetRef<CommentsSheetComponent>,
    private readonly router: Router,
    private readonly currentUserService: CurrentUserService
  ) {
  }

  public ngOnInit(): void {
    this.fetchComments();
  }

  public onSubmit(commentModel: NgModel): void {
    if (commentModel.valid && this.newCommentValue?.trim()) {
      this.showSpinner = true;
      this.currentUserService.currentUser$.subscribe((user) => {
        if (user) {
          this.addComment(user);
          this.showSpinner = false;
        } else {
          this.showSpinner = false;
          console.error("Current user not found - comment not added");
        }
      });
    }
  }

  public navigateToProfile(userId: string | number): void {
    this.router.navigate([this.getUserProfileLink(userId)]).then();
    this._bottomSheetRef.dismiss();
  }

  public getUserProfileLink(userId: string | number): string {
    return `/${AppRoutes.user}/${UserRoutes.profile}/${userId?.toString()}`;
  }

  private fetchComments(): void {
    this.activitiesService.getComments$(this.data.post.id.toString()).subscribe(comments => {
      this.commentList = comments;
      this.sortComments();
      this.showSpinner = false;
    });
  }

  private sortComments(): void {
    if (this.commentList) {
      this.commentList.sort((c1, c2) => {
        const c1Date = new Date(Date.parse(c1.createdAt));
        const c2Date = new Date(Date.parse(c2.createdAt));
        return c2Date.getTime() - c1Date.getTime();
      });
    }
  }

  private addComment(user: User): void {
    this.activitiesService.addComment(user.id, this.data.post.id.toString(), this.newCommentValue.trim()).subscribe(() => {
      const createDate = new Date().toISOString();
      if (!this.commentList) {
        this.commentList = [];
      }
      this.commentList.push({
        text: this.newCommentValue,
        createdAt: createDate,
        modifiedAt: createDate,
        user: {
          id: user.id,
          nickname: user.nickname,
          profilePicture: user.profilePicture
        },
        reactions: 0
      });
      this.data.post.commentsCount++;
      this.sortComments();
      this.newCommentValue = "";
    });
  }
}
