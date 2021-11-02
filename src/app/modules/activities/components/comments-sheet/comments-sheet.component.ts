import { Component, Inject, OnInit } from "@angular/core";
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { ActivitiesService } from "@app/core/services";
import { PostComment, User } from "@app/core/models";
import { FormBuilder, FormControl, FormGroup, NgModel, Validators } from "@angular/forms";
import { AuthService } from "@auth0/auth0-angular";
import { Utils } from "@app/shared/utils";

@Component({
  selector: "app-comments-sheet",
  templateUrl: "./comments-sheet.component.html",
  styleUrls: ["./comments-sheet.component.scss"]
})
export class CommentsSheetComponent implements OnInit {
  public commentList?: PostComment[] = undefined;
  public newCommentValue = "";

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { postId: string },
    private readonly activitiesService: ActivitiesService,
    private readonly authService: AuthService,
    private readonly _bottomSheetRef: MatBottomSheetRef<CommentsSheetComponent>
  ) {
  }

  public ngOnInit(): void {
    this.fetchComments();
  }

  public onSubmit(commentModel: NgModel): void {
    // TODO: add spinner
    if (commentModel.valid && this.newCommentValue) {
      this.activitiesService.addComment(this.data.postId, this.newCommentValue).subscribe({
        next: () => {
          this.authService.user$.subscribe((user) => {
            const createDate = new Date(Date.now()).toISOString();
            if (!this.commentList) {
              this.commentList = [];
            }
            // TODO: tmp - will be changed during integration with backend
            const currentUser = user as User;
            currentUser.profilePicture = user?.picture;
            this.commentList.push({
              text: this.newCommentValue,
              createdAt: createDate,
              modifiedAt: createDate,
              user: currentUser
            } as PostComment);

            this.sortComments();
            this.newCommentValue = "";

            console.log('',this.commentList);
          });
        }
      });
    }
  }

  private fetchComments(): void {
    this.activitiesService.getComments(this.data.postId).subscribe({
      next: comments => {
        this.commentList = comments;
        this.sortComments();
      }
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
}
